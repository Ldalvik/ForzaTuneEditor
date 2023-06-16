import { DataAPI } from "./data/DataAPI"
import TuneFileHandler from "./TuneFileHandler"
import UpgradeAPI from "./upgrades/UpgradeAPI"

export default class ForzaAPI {
    constructor() {
        this.data = null
        this.upgrades = null
        this.metadata = null

        this.tuneFiles = []
        this.currentTuneFile = null
        this.fileHandler = new TuneFileHandler()
    }

    setTuneFileById(tuneId) {
        const tuneFile = this.tuneFiles.find((tuneFile) => tuneFile.id === tuneId)
        this.setTuneFileByObject(tuneFile)
    }

    setTuneFileByObject(tuneFile) {
        this.data = new DataAPI(tuneFile.data)
        this.upgrades = new UpgradeAPI(tuneFile.data, this.data.getOrdinal())
        this.metadata = tuneFile.metadata
        this.currentTuneFile = tuneFile.data
    }

    async loadTuneFiles() {
        this.tuneFiles = await this.fileHandler.loadTuneFiles()
        return this.tuneFiles
    }

    build() {
        this.currentTuneFile.set(this.upgrades.upgradeSection, 10)
        return this.currentTuneFile
    }
}
