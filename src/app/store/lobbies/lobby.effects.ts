import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LobbyService } from "../../services/lobby.service";
import { inject } from "@angular/core";
import * as LobbyActions from "./lobby.actions";
import { catchError, exhaustMap, map, of } from "rxjs";
import { IdentityService } from "../../services/identity.service";
import { LobbyState } from "../../models/lobby.model";

export const getLobbiesEffect = createEffect(
    (
        _actions$ = inject(Actions),
        _service = inject(LobbyService)) => {

        return _actions$.pipe(
            ofType(LobbyActions.get),
            exhaustMap(() =>
                _service.getLobbies().pipe(
                    map((lobbies) => LobbyActions.getSuccess({ lobbies })),
                    catchError((error: { message: string }) =>
                        of(LobbyActions.failure({ error: error.message }))
                    ))));
    }, { functional: true });

export const createLobbyEffect = createEffect(
    (
        _actions$ = inject(Actions),
        _service = inject(LobbyService)) => {

        return _actions$.pipe(
            ofType(LobbyActions.create),
            exhaustMap((createDto) =>
                _service.createLobby(createDto).pipe(
                    map((lobby) => LobbyActions.createSuccess(lobby)),
                    catchError((error: { message: string }) =>
                        of(LobbyActions.failure({ error: error.message }))
                    ))));
    }, { functional: true });

export const addMemberEffect = createEffect(
    (
        _actions$ = inject(Actions),
        _service = inject(LobbyService),
        _identity = inject(IdentityService)) => {

        return _actions$.pipe(
            ofType(LobbyActions.addMember),
            exhaustMap((action) =>
                _identity.user$.pipe(exhaustMap(profile => _service.joinRoom(action.lobbyId, action.roomIndex).pipe(
                    map(() => LobbyActions.addMemberSuccess({ lobbyId: action.lobbyId, member: { id: profile.id, name: profile.displayName }, roomIndex: action.roomIndex })),
                    catchError((error: { message: string }) =>
                        of(LobbyActions.failure({ error: error.message }))
                    )))
                )));

    }, { functional: true });


export const removeMemberEffect = createEffect(
    (
        _actions$ = inject(Actions),
        _service = inject(LobbyService),
        _identity = inject(IdentityService)) => {

        return _actions$.pipe(
            ofType(LobbyActions.removeMember),
            exhaustMap((action) =>
                _identity.user$.pipe(exhaustMap(profile => _service.leaveRoom(action.lobbyId, action.roomIndex).pipe(
                    map(() => LobbyActions.removeMemberSuccess({ lobbyId: action.lobbyId, memberId: profile.id, roomIndex: action.roomIndex })),
                    catchError((error: { message: string }) =>
                        of(LobbyActions.failure({ error: error.message }))
                    )))
                )));

    }, { functional: true });