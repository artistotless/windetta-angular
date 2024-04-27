import { guid } from "guid-factory";
import { FundsInfo } from "./funds-info.model";
import { Room } from "./room.model";

export class Lobby {
    readonly gameId!: guid;
    readonly created!: Date;
    readonly updated!: Date;
    readonly joinFilters: Array<string> | undefined;
    readonly bet!: FundsInfo;
    rooms: Room[] = [];
    state: LobbyState = LobbyState.Awaiting;

    constructor(readonly id: string) { }
}

export enum LobbyState {
    Awaiting,
    Ready
}