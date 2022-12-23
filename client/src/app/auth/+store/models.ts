import { Injectable } from "@angular/core";

import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { filter, first, map, merge, of, shareReplay, switchMap } from "rxjs";
import { IUserLoginInfo, IUserRegisterInfo } from "src/app/core/interfaces/user";
import { userActions } from "./actions";
import { userSelectors } from "./selectors";


@Injectable({
  providedIn: 'root'
})
export class UserModel {
  user$ = this.store.select(userSelectors.user);

  isLoggedIn$ = this.user$.pipe(switchMap(user => of(!!user)))

  loadUser$ = this.actions$.pipe(ofType(userActions.loadUser));
  loadUserSuccess$ = this.actions$.pipe(ofType(userActions.loadUserSuccess));
  loadUserFailure$ = this.actions$.pipe(ofType(userActions.loadUserFailure));

  isLoading$ = merge(
    [true],
    this.loadUser$.pipe(map(() => true)),
    this.loadUserSuccess$.pipe(map(() => false)),
    this.loadUserFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  loginUser$ = this.actions$.pipe(ofType(userActions.loginUser));
  loginUserSuccess$ = this.actions$.pipe(ofType(userActions.loginUserSuccess));
  loginUserFailure$ = this.actions$.pipe(ofType(userActions.loginUserFailure));

  isLoggingIn$ = merge(
    [false],
    this.loginUser$.pipe(map(() => true)),
    this.loginUserSuccess$.pipe(map(() => false)),
    this.loginUserFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  registerUser$ = this.actions$.pipe(ofType(userActions.registerUser));
  registerUserSuccess$ = this.actions$.pipe(ofType(userActions.registerUserSuccess));
  registerUserFailure$ = this.actions$.pipe(ofType(userActions.registerUserFailure));

  isRegistering$ = merge(
    [false],
    this.registerUser$.pipe(map(() => true)),
    this.registerUserSuccess$.pipe(map(() => false)),
    this.registerUserFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  logoutUser$ = this.actions$.pipe(ofType(userActions.logoutUser));
  logoutUserSuccess$ = this.actions$.pipe(ofType(userActions.logoutUserSuccess));
  logoutUserFailure$ = this.actions$.pipe(ofType(userActions.logoutUserFailure));

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  loadUser() {
    this.store.dispatch(userActions.loadUser());
  }

  loadUserCancel() {
    this.store.dispatch(userActions.loadUserCancel());
  }

  registerUser(userInfo: IUserRegisterInfo) {
    this.store.dispatch(userActions.registerUser({ userInfo }))
  }

  loginUser(userInfo: IUserLoginInfo) {
    this.store.dispatch(userActions.loginUser({ userInfo }))
  }

  logoutUser() {
    this.store.dispatch(userActions.logoutUser());
  }

  handleDestroy() {
    this.isLoading$.pipe(first(), filter(isLoading => !!isLoading))
      .subscribe(() => this.loadUserCancel());
  }
}