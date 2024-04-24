import { guid } from "guid-factory";
import { FundsInfo } from "./funds-info.model";
import { Room } from "./room.model";

export class Lobby {
    readonly id!: guid;
    readonly gameId!: guid;
    readonly created!: Date;
    readonly updated!: Date;
    readonly joinFilters: Array<string> | undefined;
    readonly bet!: FundsInfo;
    rooms: Room[] = [];
    state: LobbyState = LobbyState.Awaiting;
}

export enum LobbyState {
    Awaiting,
    Ready
}