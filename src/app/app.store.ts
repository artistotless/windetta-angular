import { ILobbiesState } from "./store/lobbies/lobbies.state";
import { IMatchesState } from "./store/matches/matches.state";

export interface IAppStore {
    lobbies: ILobbiesState;
    matches: IMatchesState;
}
