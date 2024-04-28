import { FundsInfo } from "./funds-info.model";
import { Room } from "./room.model";

export class Lobby {
    
    readonly id!: string;
    readonly gameId!: string;
    readonly created!: Date;
    readonly updated!: Date;
    readonly joinFilters?: Array<string>;
    readonly bet!: FundsInfo;
    rooms: Room[] = [];
    state: LobbyState = LobbyState.Awaiting;
}

export enum LobbyState {
    Awaiting,
    Ready
}