import { Upgrades } from "./data/Schemas";
import rims from "./data/rims.json";
export default class UpgradeSection {
    constructor(tuneData) {
        this.buffer = Buffer.from(tuneData.slice(10, 202));
        this.rims = this.buffer.readInt16LE(Upgrades.RIMS);
        this.carBody = this.read(Upgrades.CARBODY);
        this.wingRear = this.read(Upgrades.WING_REAR);
        this.singleTurbo = this.read(Upgrades.SINGLE_TURBO);
        this.twinTurbo = this.read(Upgrades.TWIN_TURBO);
        this.quadTurbo = this.read(Upgrades.QUAD_TURBO);
        this.bumperFront = this.read(Upgrades.BUMPER_FRONT);
        this.bumperRear = this.read(Upgrades.BUMPER_REAR);
        this.hood = this.read(Upgrades.HOOD);
        this.sideskirts = this.read(Upgrades.SIDE_SKIRTS);
    }
    getRims() {
        return rims.find((rim) => rim.id === this.rims);
    }
    getCarBody() {
        return this.getPartIndex(this.carBody);
    }
    getWingRear() {
        return this.getPartIndex(this.wingRear);
    }
    getSingleTurbo() {
        return this.getPartIndex(this.singleTurbo);
    }
    getTwinTurbo() {
        return this.getPartIndex(this.twinTurbo);
    }
    getQuadTurbo() {
        return this.getPartIndex(this.quadTurbo);
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
    setRims(partId) {
        const newPartId = partId === -1 ? 4294967295 : partId;
        this.buffer.writeUint32LE(newPartId, Upgrades.RIMS);
    }
    setCarBody(partIndex) {
        this.setPartIndex(Upgrades.CARBODY, partIndex);
    }
    setWingRear(partIndex) {
        this.setPartIndex(Upgrades.WING_REAR, partIndex);
    }
    setSingleTurbo(partIndex) {
        this.setPartIndex(Upgrades.SINGLE_TURBO, partIndex);
    }
    setTwinTurbo(partIndex) {
        this.setPartIndex(Upgrades.TWIN_TURBO, partIndex);
    }
    setQuadTurbo(partIndex) {
        this.setPartIndex(Upgrades.QUAD_TURBO, partIndex);
    }
    setBumperFront(partIndex) {
        console.log(`index = ${partIndex}`);
        this.setPartIndex(Upgrades.BUMPER_FRONT, partIndex);
    }
    setBumperRear(partIndex) {
        this.setPartIndex(Upgrades.BUMPER_REAR, partIndex);
    }
    setHood(partIndex) {
        this.setPartIndex(Upgrades.HOOD, partIndex);
    }
    setSideskirts(partIndex) {
        this.setPartIndex(Upgrades.SIDE_SKIRTS, partIndex);
    }
    read(offset) {
        return this.buffer.readUint32LE(offset);
    }
    getPartIndex(upgradeValue) {
        return upgradeValue === 4294967295 ? -1 : parseInt(upgradeValue.toString().slice(-3));
    }
    setPartIndex(offset, partIndex) {
        if (partIndex === -1) {
            this.buffer.writeUint32LE(4294967295, offset);
        }
        else {
            const upgradeFull = this.read(offset).toString();
            const upgradeKey = upgradeFull.substring(0, upgradeFull.length - 3);
            const upgradeValue = partIndex.toString().padStart(3, '0');
            const newUpgradeFull = parseInt(upgradeKey + upgradeValue);
            console.log(`Was: ${upgradeFull}`);
            console.log(`New index: ${partIndex}`);
            console.log(`Now ${newUpgradeFull}`);
            this.buffer.writeUint32LE(newUpgradeFull, offset);
        }
    }
}
