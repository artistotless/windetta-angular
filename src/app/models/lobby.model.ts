import { FundsInfo } from "./funds-info.model";
import { Room } from "./room.model";

export class Lobby {
    
    readonly id!: string;
    readonly gameId!: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    readonly joinFilters?: Array<string>;
    readonly bet!: FundsInfo;
    rooms: Room[] = [];
    state: LobbyState = LobbyState.Awaiting;
}

export enum LobbyState {
    Awaiting,
    Ready
}