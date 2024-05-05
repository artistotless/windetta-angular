import { Actions, createEffect, ofType } from "@ngrx/effects";
import { LobbyService } from "../../services/lobby.service";
import { inject } from "@angular/core";
import * as LobbyActions from "./lobby.actions";
import { catchError, exhaustMap, filter, map, of } from "rxjs";
import { IAppStore } from "../../app.store";
import { Store } from "@ngrx/store";
import { profile } from "../profile/profile.selectors";

export const getCurrentLobbyEffect = createEffect(
    (
        _actions$ = inject(Actions),
        _service = inject(LobbyService),
        _store = inject(Store<IAppStore>)) => {

        return _actions$.pipe(
            ofType(LobbyActions.getCurrent),
            exhaustMap(() =>
                _store.select(profile).pipe(filter(profile => profile !== undefined), exhaustMap(profile => {
                    return _service.getUserLobby(profile.id).pipe(
                        map((currentLobby) => LobbyActions.getCurrentSuccess(currentLobby)),
                        catchError(() =>
                            of(LobbyActions.getCurrentFailure())
                        ))
                })
                )));
    }, { functional: true });

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
        _store = inject(Store<IAppStore>)) => {

        return _actions$.pipe(
            ofType(LobbyActions.addMember),
            exhaustMap((action) =>
                _store.select(profile).pipe(exhaustMap(profile => _service.joinRoom(action.lobbyId, action.roomIndex).pipe(
                    map(() => LobbyActions.addMemberSuccess({ lobbyId: action.lobbyId, member: { id: profile!.id, name: profile!.displayName }, roomIndex: action.roomIndex })),
                    catchError((error: { message: string }) =>
                        of(LobbyActions.failure({ error: error.message }))
                    )))
                )));
    }, { functional: true });


export const removeMemberEffect = createEffect(
    (
        _actions$ = inject(Actions),
        _service = inject(LobbyService),
        _store = inject(Store<IAppStore>)) => {

        return _actions$.pipe(
            ofType(LobbyActions.removeMember),
            exhaustMap((action) =>
                _store.select(profile).pipe(exhaustMap(profile => _service.leaveRoom(action.lobbyId, action.roomIndex).pipe(
                    map(() => LobbyActions.removeMemberSuccess({ lobbyId: action.lobbyId, memberId: profile!.id, roomIndex: action.roomIndex })),
                    catchError((error: { message: string }) =>
                        of(LobbyActions.failure({ error: error.message }))
                    )))
                )));
    }, { functional: true });