import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, switchMap, takeUntil } from "rxjs";
import { AuthService } from "../auth.service";
import { userActions } from "./actions";

@Injectable()
export class AuthModuleEffects {

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loadUser),
    switchMap(() => this.authService.getCurrentProfile().pipe(
      takeUntil(this.actions$.pipe(ofType(userActions.loadUserCancel))),
      map(user => userActions.loadUserSuccess({ user })),
      catchError(error => [userActions.loadUserFailure({ error })])
    ))
  ));

  registerUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.registerUser),
    switchMap(({ userInfo }) => this.authService.register(userInfo).pipe(
      map(user => userActions.registerUserSuccess({ user })),
      catchError(error => [userActions.registerUserFailure({ error })])
    ))
  ));

  loginUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.loginUser),
    switchMap(({ userInfo }) => this.authService.login(userInfo).pipe(
      map(user => userActions.loginUserSuccess({ user })),
      catchError(error => [userActions.loginUserFailure({ error })])
    ))
  ));

  logoutUser$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.logoutUser),
    switchMap(() => this.authService.logout().pipe(
      map(user => userActions.logoutUserSuccess()),
      catchError(error => [userActions.logoutUserFailure({ error })])
    ))
  ));

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) { }
}