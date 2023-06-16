import { DataSchema } from "./DataSchema"
export class DataAPI {
    constructor(tuneFile) {
        this.dataSection = Buffer.from(tuneFile.slice(0, 10))
        this.version = this.dataSection.readInt8(DataSchema.VERSION)
        this.ordinal = this.readData(DataSchema.ORDINAL)
        this.unknown_1 = this.readData(DataSchema.UNKNOWN_1)
    }
    getVersion() {
        return this.version
    }

    getOrdinal() {
        return this.ordinal
    }

    getUnknown_1() {
        return this.unknown_1
    }
    
    readData(byteOffset) {
        return this.dataSection.readUint16LE(byteOffset)
    }

}