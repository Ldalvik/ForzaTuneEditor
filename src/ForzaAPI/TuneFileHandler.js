
const path = require('path')
const fs = window.require('fs')
const homedir = window.require('os').homedir

export default class TuneFileHandler {
    constructor() {
        this.FORZA_PATH = path.join(homedir(), '/AppData/Local/Packages/Microsoft.624F8B84B80_8wekyb3d8bbwe');
        this.STEAM_FORZA_PATH = path.join(homedir(), '/');
        this.TUNE_FILES_PATH = path.join(this.FORZA_PATH, '/SystemAppData/wgs');
        this.tuneFiles = [];
    }
    checkForzaExists(isSteamVersion = false) {
        return fs.existsSync(isSteamVersion ? this.STEAM_FORZA_PATH : this.FORZA_PATH);
    }
    findTuneFiles(file = null) {
        const folder = file || this.TUNE_FILES_PATH;
        const files = fs.readdirSync(folder);
        for (const fileName of files) {
            const fileDirectory = path.join(folder, fileName);
            const fileInfo = fs.lstatSync(fileDirectory);
            if (fileInfo.isDirectory()) {
                // Look through all folders underneath the current directory
                // Probably very inefficient
                this.findTuneFiles.call(this, fileDirectory); // instead of normal recursion, use function.call to keep class context
            }
            else if (fileInfo.isFile() && fileInfo.size === 386) {
                // If it's a file and its 386 bytes, it's most likely a tune
                const tuneData = fs.readFileSync(fileDirectory);
                // Tune version, final check to verify if it's a tune
                if (tuneData[0] !== 3)
                    continue;
                this.tuneFiles.push({
                    id: fileName,
                    tuneFolderPath: folder,
                    rawData: tuneData,
                });
            }
        }
        return this.tuneFiles;
    }
    findMetadataFile(tuneFolderPath) {
        const files = fs.readdirSync(tuneFolderPath);
        for (const fileName of files) {
            const fileDirectory = path.join(tuneFolderPath, fileName);
            const fileData = fs.readFileSync(fileDirectory);
            // Pretty fragile checking, but probably OK. Tune folder files aren't very diverse.
            if (!fileName.includes('container') && fileData[0] === 6) {
                return fileData;
            }
        }
    }
    saveTune(tuneFolderPath, tuneId, tuneData) {
        const tunePath = path.join(tuneFolderPath, tuneId);
        try {
            fs.writeFileSync(tunePath, tuneData);
            console.log(`Saved tune at ${tunePath}`);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
}
