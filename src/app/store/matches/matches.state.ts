import { EntityState } from "@ngrx/entity";
import { OngoingMatch } from "../../models/match-info.model";

export interface IMatchesState extends EntityState<OngoingMatch> {
    isLoading: boolean;
    error: string | null;
}
