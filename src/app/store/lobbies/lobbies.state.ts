import { EntityState } from "@ngrx/entity";
import { Lobby } from "../../models/lobby.model";
import { UserLobbyMapEntry } from "../../models/user-lobby-map-entry";

export interface ILobbiesState extends EntityState<Lobby> {
    currentLobby: UserLobbyMapEntry | undefined | null;
    isLoading: boolean;
    isCached: boolean;
    error: string | null;
}