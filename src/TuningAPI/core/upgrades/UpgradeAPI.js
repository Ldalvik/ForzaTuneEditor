import { UpgradeSchema } from "./UpgradeSchema"

export default class UpgradeAPI {
    constructor(tuneData, ordinal) {
        this.upgradeSection = Buffer.from(tuneData.slice(10, 202))
        this.ordinal = ordinal

        this.rims = this.upgradeSection.readInt16LE(UpgradeSchema.RIMS)
        this.carBody = this.readUpgrade(UpgradeSchema.CARBODY)
        this.wingRear = this.readUpgrade(UpgradeSchema.WING_REAR)
        this.bumperFront = this.readUpgrade(UpgradeSchema.BUMPER_FRONT)
        this.bumperRear = this.readUpgrade(UpgradeSchema.BUMPER_REAR)
        this.hood = this.readUpgrade(UpgradeSchema.HOOD)
        this.sideskirts = this.readUpgrade(UpgradeSchema.SIDE_SKIRTS)
    }

    getCarBody() {
        return this.getPartIndex(this.carBody);
    }

    getWingRear() {
        return this.getPartIndex(this.wingRear);
    }

    getBumperFront() {
        return this.getPartIndex(this.bumperFront);
    }

    getBumperRear() {
        return this.getPartIndex(this.bumperRear);
    }

    getHood() {
        return this.getPartIndex(this.hood);
    }

    getSideskirts() {
        return this.getPartIndex(this.sideskirts);
    }

    setCarBody(partIndex) {
        this.setPartIndex(UpgradeSchema.CARBODY, partIndex);
    }

    setWingRear(partIndex) {
        this.setPartIndex(UpgradeSchema.WING_REAR, partIndex);
    }

    setSingleTurbo(partIndex) {
        this.setPartIndex(UpgradeSchema.SINGLE_TURBO, partIndex);
    }

    setTwinTurbo(partIndex) {
        this.setPartIndex(UpgradeSchema.TWIN_TURBO, partIndex);
    }

    setQuadTurbo(partIndex) {
        this.setPartIndex(UpgradeSchema.QUAD_TURBO, partIndex);
    }

    setBumperFront(partIndex) {
        this.setPartIndex(UpgradeSchema.BUMPER_FRONT, partIndex);
    }

    setBumperRear(partIndex) {
        this.setPartIndex(UpgradeSchema.BUMPER_REAR, partIndex);
    }

    setHood(partIndex) {
        this.setPartIndex(UpgradeSchema.HOOD, partIndex);
    }

    setSideskirts(partIndex) {
        this.setPartIndex(UpgradeSchema.SIDE_SKIRTS, partIndex);
    }

    readUpgrade(byteOffset) {
        return this.upgradeSection.readUint32LE(byteOffset)
    }
 
    getPartIndex(upgradeValue) {
        return parseInt(upgradeValue.toString().slice(-3))
    }

    setPartIndex(byteOffset, partIndex) {
        const upgradeKey = this.readUpgrade(byteOffset).toString()
        this.upgradeSection.writeUint32LE(upgradeKey.substring(0, upgradeKey-3) + partIndex.toString().padStart(3, '0'), byteOffset)
    }
}
