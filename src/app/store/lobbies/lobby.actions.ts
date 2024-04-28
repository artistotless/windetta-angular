import { createAction, props } from "@ngrx/store";
import { Lobby } from "../../models/lobby.model";
import { CreateLobbyDto } from "../../models/lobby-create-dto.model";
import { LeaveLobbyDto } from "../../models/lobby-leave-dto.model";
import { JoinLobbyDto } from "../../models/lobby-join.dto.models";
import { RoomMember } from "../../models/room-member.model";

export const failure = createAction("[Lobbies] Failure", props<{ error: string }>());

export const get = createAction("[Lobbies] Get");
export const getSuccess = createAction("[Lobbies] Get success", props<{ lobbies: Lobby[] }>());

export const create = createAction("[Lobbies] Create", props<CreateLobbyDto>());
export const createSuccess = createAction("[Lobbies] Create success", props<Lobby>());

export const remove = createAction("[Lobbies] Remove lobby", props<{ lobbyId: string }>());

export const removeMember = createAction("[Lobbies] Remove member", props<LeaveLobbyDto>());
export const removeMemberSuccess = createAction("[Lobbies] Remove member success", props<{ lobbyId: string, roomIndex: number, memberId: string }>());

export const addMember = createAction("[Lobbies] Add member", props<JoinLobbyDto>());
export const addMemberSuccess = createAction("[Lobbies] Add member success", props<{ lobbyId: string, roomIndex: number, member: RoomMember }>());