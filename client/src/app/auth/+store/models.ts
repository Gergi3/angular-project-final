import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { userSelectors } from "./selectors";
import { userActions } from "./actions";
import { Actions, ofType } from "@ngrx/effects";
import { filter, first, map, merge, shareReplay, switchMap, of } from "rxjs";
import { IUserLoginInfo, IUserRegisterInfo } from "src/app/core/interfaces/user";


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

  registerUser$ = this.actions$.pipe(ofType(userActions.registerUser));
  registerUserSuccess$ = this.actions$.pipe(ofType(userActions.registerUserSuccess));
  registerUserFailure$ = this.actions$.pipe(ofType(userActions.registerUserFailure));

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