export default class TuningAPI {
    constructor(tuneFile) {
        this.tuneFile = new Uint8Array(tuneFile)
    }

    // Get tune file values
    getOrdinal     = () => this.getValue(2)
    getRims        = () => this.getPartIndex(10)
    getCarBody     = () => this.getPartIndex(22)
    getRearWing    = () => this.getPartIndex(50)
    getFrontBumper = () => this.getPartIndex(150)
    getRearBumper  = () => this.getPartIndex(154)
    getHood        = () => this.getPartIndex(158)
    getSideskirts  = () => this.getPartIndex(162)

    // Set tune file values
    setRims        = (id)        => this.setPartIndex(10, id)
    setCarBody     = (partIndex) => this.setPartIndex(22, partIndex)
    setRearWing    = (partIndex) => this.setPartIndex(50, partIndex)
    setFrontBumper = (partIndex) => this.setPartIndex(150, partIndex)
    setRearBumper  = (partIndex) => this.setPartIndex(154, partIndex)
    setHood        = (partIndex) => this.setPartIndex(158, partIndex)
    setSideskirts  = (partIndex) => this.setPartIndex(162, partIndex)
    
    // Upgrade part specific (ordinal + pad + index)
    getPartIndex = (byteIndex) => parseInt(this.getValue(byteIndex).toString().slice(-3))
    setPartIndex = (byteIndex, partIndex) => this.setValue(byteIndex, this.getOrdinal() + partIndex.toString().padStart(3, '0'))

    // General
    getValue     = (byteIndex) => this.tuneFile.slice(byteIndex, byteIndex + 4).reduceRight((value, byte) => (value << 8) + byte, 0)
    setValue     = (byteIndex, partValue) => this.tuneFile.set(Uint8Array.from({ length: 4 }, (_, i) => (partValue >> (i * 8)) & 0xff), byteIndex)
}