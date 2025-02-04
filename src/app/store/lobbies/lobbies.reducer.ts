import { createReducer, on } from "@ngrx/store";
import * as LobbyActions from "./lobby.actions";
import { ILobbiesState } from "./lobbies.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Lobby } from "../../models/lobby.model";

export function sortByName(a: Lobby, b: Lobby): number {
    return a.id.localeCompare(b.id);
}

export const adapter: EntityAdapter<Lobby> = createEntityAdapter<Lobby>({
    selectId: (lobby) => lobby.id,
    sortComparer: (lobbyA, lobbyB): number => lobbyA.id.localeCompare(lobbyB.id)
});

const _initialState: ILobbiesState = adapter.getInitialState({
    isLoading: false,
    error: null,
    isCached: false
})

export const lobbyReducers = createReducer(_initialState,
    on(LobbyActions.failure, (state, action) => ({ ...state, isLoading: false, error: action.error })),
    on(LobbyActions.get, (state) => ({ ...state, isLoading: true })),
    on(LobbyActions.getSuccess, (state, action) => adapter.addMany(action.lobbies, { ...state, isLoading: false, isCached: true })),
    on(LobbyActions.createSuccess, (state, lobby) => adapter.addOne(lobby, state)),
    on(LobbyActions.addMemberSuccess, (state, action) => adapter.mapOne({ id: action.lobbyId, map: (l) => ({ ...l, rooms: l.rooms.map((room, index) => { return action.roomIndex == index ? room.addMember(action.member) : room }) }) }, state)),
    on(LobbyActions.removeMemberSuccess, (state, action) => adapter.mapOne({ id: action.lobbyId, map: (l) => ({ ...l, rooms: l.rooms.map((room, index) => { return action.roomIndex == index ? room.removeMember(action.memberId) : room }) }) }, state))
);