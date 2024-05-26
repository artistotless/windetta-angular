import { createAction, props } from "@ngrx/store";
import { Lobby } from "../../models/lobby.model";
import { CreateLobbyDto } from "../../models/lobby-create-dto.model";
import { LeaveLobbyDto } from "../../models/lobby-leave-dto.model";
import { JoinLobbyDto } from "../../models/lobby-join.dto.models";
import { RoomMember } from "../../models/room-member.model";
import { UserLobbyMapEntry } from "../../models/user-lobby-map-entry";

export const failure = createAction("[Lobbies] Failure", props<{ error: string }>());

export const get = createAction("[Lobbies] Get");
export const getSuccess = createAction("[Lobbies] Get success", props<{ lobbies: Lobby[] }>());

export const getCurrent = createAction("[Lobbies] Get current user lobby");
export const getCurrentSuccess = createAction("[Lobbies] Get current user lobby: success", props<UserLobbyMapEntry>());
export const getCurrentFailure = createAction("[Lobbies] Get current user lobby: failure");

export const add = createAction("[Lobbies] Add", props<Lobby>());
export const create = createAction("[Lobbies] Create", props<CreateLobbyDto>());
export const createSuccess = createAction("[Lobbies] Create success", props<Lobby>());
export const remove = createAction("[Lobbies] Remove lobby", props<{ lobbyId: string }>());
export const update = createAction("[Lobbies] Update lobby", props<Lobby>());

export const setReady = createAction("[Lobbies] Set ready lobby", props<{ lobbyId: string }>());

export const removeMember = createAction("[Lobbies] Remove member", props<LeaveLobbyDto>());
export const removeMemberSuccess = createAction("[Lobbies] Remove member success", props<{ lobbyId: string, roomIndex: number, memberId: string }>());

export const addMember = createAction("[Lobbies] Add member", props<JoinLobbyDto>());
export const addMemberSuccess = createAction("[Lobbies] Add member success", props<{ lobbyId: string, roomIndex: number, member: RoomMember }>());