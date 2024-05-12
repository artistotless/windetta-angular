import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IProfileState } from "./profile.state";

const selectorFeature = createFeatureSelector<IProfileState>("profile");

export const profile = createSelector(selectorFeature, (state) => state.profile);
export const isAuthenticated = createSelector(selectorFeature, (state) => state.profile !== undefined && state.profile !== null);