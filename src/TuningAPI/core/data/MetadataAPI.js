const fs = window.require('fs')

export default class MetadataAPI {
    // TODO: Get other options such as car class, type, tags, etc
    constructor(tuneFolderPath) {
        this.tuneFolderPath = tuneFolderPath
        this.tuneMetadata = null
        this.titleLength = null
        this.descriptionLength = null
        this.gamertagLength = null
    }

    async loadMetadata() {
        try {
            const files = await fs.promises.readdir(this.tuneFolderPath)
            for (const fileName of files) {
                const fileDirectory = `${this.tuneFolderPath}/${fileName}`
                const fileData = await fs.promises.readFile(fileDirectory)
                // Pretty fragile checking, but probably OK. Tune folder files aren't very diverse.
                if (!fileName.includes("container") && fileData[0] === 6) {
                    this.tuneMetadata = new Uint8Array(fileData)
                    this.titleLength = this.tuneMetadata[4] * 2
                    this.descriptionLength = this.tuneMetadata[8 + this.titleLength] * 2
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    getTitle() {
        return this.getStringFromBytes(8, this.titleLength)
    }

    getDescription() {
        return this.getStringFromBytes(8 + this.titleLength + 4, this.descriptionLength)
    }

    getUploadDate() {
        const offset = 8 + this.titleLength + 4 + this.descriptionLength
        let uploadDateBytes = this.tuneMetadata.slice(offset, offset + 12)
        const uint16UploadDate = new Uint16Array(uploadDateBytes.buffer)
        let [year, month, day, hour, minute, second] = uint16UploadDate

        hour = hour.toString().padStart(2, '0')
        minute = minute.toString().padStart(2, '0')
        second = second.toString().padStart(2, '0')

        return `${month}/${day+1}/${year}, ${hour}:${minute}:${second}`
    }

    getGamertag() {
        const offset = 44 + this.titleLength + this.descriptionLength
        const gamertagLength = this.tuneMetadata[offset - 4] * 2
        return this.getStringFromBytes(offset, gamertagLength)
    }

    getStringFromBytes(offset, length) {
        const stringBytes = this.tuneMetadata.slice(offset, offset + length)
        const stringCodeUnits = new Uint16Array(stringBytes.buffer)
        return String.fromCharCode(...stringCodeUnits)
    }
}
