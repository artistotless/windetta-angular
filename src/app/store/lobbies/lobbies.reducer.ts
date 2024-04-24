import { createReducer, on } from "@ngrx/store";
import { get, add, addMember, removeMember, getSuccess, getFailure } from "./lobby.actions";
import { ILobbiesState } from "./lobbies.state";
import { createEntityAdapter, EntityAdapter } from "@ngrx/entity";
import { Lobby } from "../../models/lobby.model";

export const adapter: EntityAdapter<Lobby> = createEntityAdapter<Lobby>();

const _initialState: ILobbiesState = adapter.getInitialState({ isLoading: false, error: null });

export const lobbyReducers = createReducer(_initialState,
    on(get, (state) => ({ ...state, isLoading: true })),
    on(getSuccess, (state, action) => adapter.addMany(action.lobbies, { ...state, isLoading: false })),
    on(getFailure, (state, action) => ({ ...state, isLoading: false, error: action.error })),
    on(add, (state, lobby) => adapter.addOne(lobby, state)),
    on(addMember, (state, action) => adapter.mapOne({ id: action.lobbyId, map: (l) => ({ ...l, rooms: l.rooms.map((room, index) => { return action.roomIndex == index ? room.addMember(action.member) : room }) }) }, state)),
    on(removeMember, (state, action) => adapter.mapOne({ id: action.lobbyId, map: (l) => ({ ...l, rooms: l.rooms.map((room, index) => { return action.roomIndex == index ? room.removeMember(action.memberId) : room }) }) }, state)));