import { IProfile } from "../../models/profile.model";

export interface IProfileState {
    profile: IProfile | null | undefined;
    isLoading: boolean;
    error: string | null;
}
