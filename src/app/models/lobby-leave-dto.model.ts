import { guid } from "guid-factory";

export class LeaveLobbyDto {
    readonly roomIndex!: number;
    readonly lobbyId!: guid;
}