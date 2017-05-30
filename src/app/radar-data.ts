import { DataEntry } from './data-entry';

export class RadarData {
	name: string;
	data: DataEntry[];

	constructor(name: string, data: DataEntry[] ) {
		this.name = name;
		this.data = data;
	}
}