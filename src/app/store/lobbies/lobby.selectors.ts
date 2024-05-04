import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter } from "./lobbies.reducer";
import { ILobbiesState } from "./lobbies.state";

const selectorFeature = createFeatureSelector<ILobbiesState>("lobby");

export const allLobbies = createSelector(selectorFeature, adapter.getSelectors().selectAll);
export const currentUserLobby = createSelector(selectorFeature, (state) => state.currentLobby);
export const isCurrentUserInLobby = createSelector(selectorFeature, (state) => state.currentLobby !== undefined && state.currentLobby !== null);
export const isCached = createSelector(selectorFeature, (state) => state.isCached);
export const count = createSelector(selectorFeature, adapter.getSelectors().selectTotal);
export const isUserJoined = (lobbyId: string, memberId: string) => createSelector(selectorFeature, (state) => {

    let found = adapter.getSelectors().selectAll(state).filter(l => l.id === lobbyId);

    if (found.length > 0) {
        return found[0].rooms.forEach(r => {
            r.members.forEach(m => {
                return m.id === memberId;
            })
        });
    }

    return false;
});