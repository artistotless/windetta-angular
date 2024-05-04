import { ILobbiesState } from "./store/lobbies/lobbies.state";
import { IMatchesState } from "./store/matches/matches.state";
import { IProfileState } from "./store/profile/profile.state";

export interface IAppStore {
    lobbies: ILobbiesState;
    matches: IMatchesState;
    profile: IProfileState;
}
