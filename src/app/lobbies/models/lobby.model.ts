import { Guid, guid } from "guid-factory";
import { Player } from "../../shared/models/player.model";

export class Lobby {
    readonly id: guid = Guid.empty();
    readonly gameId: guid = Guid.empty();
    readonly initiatorId: guid = Guid.empty();
    readonly properties: Record<string, string> | undefined;
    players: Array<Player> = [];
    state: LobbyState = LobbyState.Awaiting;
}

export enum LobbyState {
    Awaiting,
    Ready
}