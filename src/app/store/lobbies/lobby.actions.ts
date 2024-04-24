import { createAction, props } from "@ngrx/store";
import { Lobby } from "../../models/lobby.model";
import { guid } from "guid-factory";
import { RoomMember } from "../../models/room-member.model";

export const get = createAction("[Lobbies] Get lobbies");
export const getSuccess = createAction("[Lobbies] Get success", props<{ lobbies: Lobby[] }>());
export const getFailure = createAction("[Lobbies] Get failure", props<{ error: string }>());
export const add = createAction("[Lobbies] Add lobby", props<Lobby>());
export const remove = createAction("[Lobbies] Remove lobby", props<{ lobbyId: guid}>());
export const removeMember = createAction("[Lobbies] Remove member", props<{ lobbyId: guid, roomIndex: number, memberId: guid }>());
export const addMember = createAction("[Lobbies] Add member", props<{ lobbyId: guid, roomIndex: number, member: RoomMember }>());