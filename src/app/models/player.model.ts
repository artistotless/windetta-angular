import { guid } from "guid-factory";

export class Player {
    id!: guid;
    name: string = `Player#${this.id}`;
    index: number = 0;
}
