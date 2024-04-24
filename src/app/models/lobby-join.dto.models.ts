import { guid } from "guid-factory";

export class JoinLobbyDto {
    readonly roomIndex!: number;
    readonly lobbyId!: guid;
}
