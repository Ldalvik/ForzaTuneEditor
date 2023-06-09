import MetadataAPI from './MetadataAPI'

const path = require('path')
const fs = window.require('fs')
const homedir = window.require('os').homedir()

export default class TuneFileHandler {
    FORZA_PATH = path.join(homedir, '/AppData/Local/Packages/Microsoft.624F8B84B80_8wekyb3d8bbwe')
    STEAM_FORZA_PATH = path.join(homedir, '/')
    TUNE_FILES_PATH = path.join(this.FORZA_PATH, '/SystemAppData/wgs')

    constructor() {
        this.tuneFiles = []
    }

    checkForzaExists = async (isSteamVersion) => {
        return await fs.existsSync(isSteamVersion ? this.STEAM_FORZA_PATH : this.FORZA_PATH)
    }
    async loadTuneFiles(file = null) {
        const folder = file || this.TUNE_FILES_PATH;
        try {
            const files = await fs.promises.readdir(folder);
            for (const fileName of files) {
                const fileDirectory = `${folder}/${fileName}`;
                const fileInfo = await fs.promises.lstat(fileDirectory);

                if (fileInfo.isDirectory()) {
                    // Look through all folders underneath the current directory
                    // Probably very inefficient
                    await this.loadTuneFiles.call(this, fileDirectory) // instead of normal recursion, use function.call to keep class context
                } else if (fileInfo.isFile() && fileInfo.size === 378) {
                    // If it's a file and its 378 bytes, it's most likely a tune
                    const tuneData = await fs.promises.readFile(fileDirectory)
                    const metadataAPI = new MetadataAPI(folder)
                    await metadataAPI.loadMetadata()
                    this.tuneFiles.push({
                        id: fileName,
                        tuneFolderPath: folder,
                        data: tuneData,
                        metadata: metadataAPI
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async saveTune(tuneFileId, tuneFileData) {
        const tuneFile = this.tuneFiles.find((tuneFile) => tuneFile.id === tuneFileId)
        const tunePath = path.join(tuneFile.tuneFolderPath, tuneFile.id)
        await fs.writeFile(tunePath, tuneFileData, (error) => {
            if (error) {
                console.log(error)
                return false
            } else {
                console.log(`Saved tune at ${tunePath}`)
                return true
            }
        })
    }
}
