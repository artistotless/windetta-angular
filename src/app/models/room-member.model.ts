import { guid } from "guid-factory";

export class RoomMember {
    readonly id!: guid;
    readonly name!: string;
}
