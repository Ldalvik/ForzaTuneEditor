import { Data } from "./data/Schemas";
import ordinals from "./data/ordinals.json";
export default class DataSection {
    constructor(tuneData) {
        this.buffer = Buffer.from(tuneData.slice(0, 6));
        this.version = this.buffer.readInt8(Data.VERSION);
        this.ordinal = this.buffer.readUInt16LE(Data.ORDINAL);
        const carData = ordinals.find((car) => car.id === this.ordinal);
        this.make = (carData === null || carData === void 0 ? void 0 : carData.make) || "[Unknown Make]";
        this.model = (carData === null || carData === void 0 ? void 0 : carData.model) || "[Unknown Make]";
        this.year = (carData === null || carData === void 0 ? void 0 : carData.year) || "[Unknown Year]";
    }
    getCarNameFull() {
        return `${this.make} ${this.model} (${this.year})`;
    }
}
