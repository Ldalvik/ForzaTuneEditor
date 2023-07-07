export default class MetadataAPI {
    constructor(fileData) {
        this.fileData = fileData;
        this.titleOffset = 8;
        this.titleLength = this.readValue(4);
        this.descriptionOffset = this.titleOffset + this.titleLength + 4;
        this.descriptionLength = this.readValue(this.titleOffset + this.titleLength);
        this.uploadDateOffset = this.descriptionOffset + this.descriptionLength;
        this.gamertagOffset = this.uploadDateOffset + 32;
        this.gamertagLength = this.readValue(this.gamertagOffset - 4);
    }
    readValue(offset) {
        return this.fileData.readUInt8(offset) * 2;
    }
    getTitle() {
        return this.getStringFromBytes(this.titleOffset, this.titleLength);
    }
    getDescription() {
        return this.getStringFromBytes(this.descriptionOffset, this.descriptionLength);
    }
    getUploadDate() {
        const year = this.fileData.readUint16LE(this.uploadDateOffset);
        const month = this.fileData.readUint16LE(this.uploadDateOffset + 4);
        const day = this.fileData.readUint16LE(this.uploadDateOffset + 8);
        const hour = this.fileData.readUint16LE(this.uploadDateOffset + 12);
        const minute = this.fileData.readUint16LE(this.uploadDateOffset + 16);
        const second = this.fileData.readUint8(this.uploadDateOffset + 20);
        const _hour = hour.toString().padStart(2, '0');
        const _minute = minute.toString().padStart(2, '0');
        const _second = second.toString().padStart(2, '0');
        return `${month + 1}/${day + 1}/${year}, ${_hour}:${_minute}`;
    }
    getGamertag() {
        return this.getStringFromBytes(this.gamertagOffset, this.gamertagLength);
    }
    getStringFromBytes(offset, length) {
        const stringBytes = new Uint8Array(this.fileData).slice(offset, offset + length);
        const stringCodeUnits = new Uint16Array(stringBytes.buffer);
        return String.fromCharCode(...stringCodeUnits);
    }
}
