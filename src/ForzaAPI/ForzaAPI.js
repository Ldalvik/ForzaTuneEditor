import DataSection from "./DataSection";
import TuneFileHandler from "./TuneFileHandler";
import UpgradeAPI from "./UpgradeSection";
import MetadataAPI from "./MetadataAPI";
export default class ForzaAPI {
    constructor(tuneFile) {
        this.fileHandler = new TuneFileHandler();
        this.tuneFile = tuneFile;
        this.data = new DataSection(new Uint8Array(tuneFile.rawData));
        this.upgrades = new UpgradeAPI(new Uint8Array(tuneFile.rawData));
        this.metadata = new MetadataAPI(this.fileHandler.findMetadataFile(tuneFile.tuneFolderPath));
        this.tuneFileCopy = tuneFile.rawData;
    }
    build() {
        let typedArr = new Uint8Array(this.tuneFileCopy);
        typedArr.set(this.upgrades.buffer, 10);
        this.tuneFileCopy = Buffer.from(typedArr);
        return this.tuneFileCopy;
    }
    setConfig(data) {
        if (data.rims !== undefined)
            this.upgrades.setRims(data.rims);
        if (data.carBody !== undefined)
            this.upgrades.setCarBody(data.carBody);
        if (data.wingRear !== undefined)
            this.upgrades.setWingRear(data.wingRear);
        if (data.singleTurbo !== undefined)
            this.upgrades.setSingleTurbo(data.singleTurbo);
        if (data.twinTurbo !== undefined)
            this.upgrades.setTwinTurbo(data.twinTurbo);
        if (data.quadTurbo !== undefined)
            this.upgrades.setQuadTurbo(data.quadTurbo);
        if (data.bumperFront !== undefined)
            this.upgrades.setBumperFront(data.bumperFront);
        if (data.bumperRear !== undefined)
            this.upgrades.setBumperRear(data.bumperRear);
        if (data.hood !== undefined)
            this.upgrades.setHood(data.hood);
        if (data.sideskirts !== undefined)
            this.upgrades.setSideskirts(data.sideskirts);
    }
    getConfig() {
        const config = {
            rims: this.upgrades.rims,
            carBody: this.upgrades.getCarBody(),
            wingRear: this.upgrades.getWingRear(),
            singleTurbo: this.upgrades.getSingleTurbo(),
            twinTurbo: this.upgrades.getTwinTurbo(),
            quadTurbo: this.upgrades.getQuadTurbo(),
            bumperFront: this.upgrades.getBumperFront(),
            bumperRear: this.upgrades.getBumperRear(),
            hood: this.upgrades.getHood(),
            sideskirts: this.upgrades.getSideskirts()
        };
        return config;
    }
    saveTune() {
        return this.fileHandler.saveTune(this.tuneFile.tuneFolderPath, this.tuneFile.id, this.build());
    }
}
