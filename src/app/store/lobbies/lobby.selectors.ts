import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter } from "./lobbies.reducer";
import { ILobbiesState } from "./lobbies.state";

const selectorFeature = createFeatureSelector<ILobbiesState>("lobby");

export const allLobbies = createSelector(selectorFeature, adapter.getSelectors().selectAll);
export const isCached = createSelector(selectorFeature, (state) => state.isCached);
export const count = createSelector(selectorFeature, adapter.getSelectors().selectTotal);