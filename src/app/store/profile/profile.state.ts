import { IProfile } from "../../models/profile.model";

export interface IProfileState {
    profile: IProfile | undefined | null;
    isLoading: boolean;
    error: string | null;
}
