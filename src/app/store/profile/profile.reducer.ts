import { createReducer, on } from "@ngrx/store";
import { IProfileState } from "./profile.state";
import * as ProfileActions from "./profile.actions";

const _initialState: IProfileState = {
    profile: undefined,
    isLoading: false,
    error: null,
};

export const profileReducers = createReducer(_initialState,
    on(ProfileActions.get, (state) => ({ ...state, isLoading: true })),
    on(ProfileActions.getSuccess, (state, action) => ({ ...state, profile: action.profile, isLoading: false })),
    on(ProfileActions.getFailure, (state, action) => ({ ...state, profile: null, isLoading: false, error: action.error })),
);