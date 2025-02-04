import { EntityState } from "@ngrx/entity";
import { Lobby } from "../../models/lobby.model";

export interface ILobbiesState extends EntityState<Lobby> {
    isLoading: boolean;
    isCached: boolean;
    error: string | null;
}