import { createReducer, on } from "@ngrx/store";
import * as LobbyActions from "./lobby.actions";
import { ILobbiesState } from "./lobbies.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Lobby } from "../../models/lobby.model";
import { produce } from "immer";

export function sortByName(a: Lobby, b: Lobby): number {
    return a.id.localeCompare(b.id);
}

export const adapter: EntityAdapter<Lobby> = createEntityAdapter<Lobby>({
    selectId: (lobby) => lobby.id,
    sortComparer: (lobbyA, lobbyB): number => lobbyA.id.localeCompare(lobbyB.id)
});

const _initialState: ILobbiesState = adapter.getInitialState({
    currentLobby: undefined,
    isLoading: false,
    error: null,
    isCached: false
})

export const lobbyReducers = createReducer(_initialState,
    on(LobbyActions.failure, (state, action) => ({ ...state, isLoading: false, error: action.error })),
    on(LobbyActions.getCurrent, (state) => ({ ...state, currentLobby: undefined })),
    on(LobbyActions.getCurrentSuccess, (state, currentLobby) => ({ ...state, currentLobby: currentLobby })),
    on(LobbyActions.getCurrentFailure, (state) => ({ ...state, currentLobby: null })),
    on(LobbyActions.get, (state) => ({ ...state, isLoading: true })),
    on(LobbyActions.getSuccess, (state, action) => adapter.addMany(action.lobbies, { ...state, isLoading: false, isCached: true })),
    on(LobbyActions.createSuccess, (state, lobby) => adapter.addOne(lobby, state)),

    on(LobbyActions.addMemberSuccess, (state, action) => adapter.mapOne({
        id: action.lobbyId, map: (l) => produce(l, draft => {
            draft.rooms[action.roomIndex].members.push(action.member);
        })
    }, state)),

    on(LobbyActions.removeMemberSuccess, (state, action) => adapter.mapOne({
        id: action.lobbyId, map: (l) => produce(l, draft => {
            draft.rooms[action.roomIndex].members = draft.rooms[action.roomIndex].members.filter(v => v.id !== action.memberId);
        })
    }, state)),

);