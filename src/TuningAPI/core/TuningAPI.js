export default class TuningAPI {
    constructor(tuneFile) {
        this.rawTuneFile = new Uint8Array(tuneFile)

        if(tuneFile.length === 378) { 
            this.upgradeSection =  new Uint16Array(this.rawTuneFile.slice(2, 194))
        } else if(tuneFile.length === 386) {
            this.upgradeSection = new Uint16Array(this.rawTuneFile.slice(2, 200))
        }
    }

    build() {
        this.rawTuneFile.set(this.upgradeSection, 2)
        return this.rawTuneFile
    }
    
    getVersion() {
        return this.rawTuneFile[0]
    }
    getOrdinal() {
        return this.getValue(0)
    }
    getRims() {
        return this.getValue(8)
    }
    getCarBody() {
        return this.getPartIndex(this.getValue(20))
    }
    getWingRear() {
        return this.getPartIndex(this.getValue(48))
    }
    getBumperFront() {
        return this.getPartIndex(this.getValue(148))
    }
    getBumperRear() {
        return this.getPartIndex(this.getValue(152))
    }
    getHood() {
        return this.getPartIndex(this.getValue(156))
    }
    getSideskirts() {
        return this.getPartIndex(this.getValue(160))
    }

    setRims(id) {
        this.setValue(8, id)
    }
    setCarBody(partIndex) {
        this.setPartIndex(20, partIndex)
    }
    setWingRear(partIndex) {
        this.setPartIndex(48, partIndex)
    }
    setBumperFront(partIndex) {
        this.setPartIndex(148, partIndex)
    }
    setBumperRear(partIndex) {
        this.setPartIndex(152, partIndex)
    }
    setHood(partIndex) {
        this.setPartIndex(156, partIndex)
    }
    setSideskirts(partIndex) {
        this.setPartIndex(160, partIndex)
    }

    // Upgrade part specific (ordinal + pad + index)
    getPartIndex(upgradeByte) {
        return parseInt(upgradeByte.toString().slice(-3))
    }
    setPartIndex(byteIndex, partIndex) {
        this.setValue(byteIndex, this.getOrdinal() + partIndex.toString().padStart(3, '0'))
    }

    // Raw value editing
    getValue(byteIndex) {
        return this.upgradeSection.slice(byteIndex, byteIndex + 4)
            .reduceRight((value, byte) => (value << 8) + byte, 0)
    }
    setValue(byteIndex, partValue) {
        this.upgradeSection.set(
            Uint8Array.from({ length: 4 }, (_, i) => (partValue >> (i * 8)) & 0xff), byteIndex)
    }
}
