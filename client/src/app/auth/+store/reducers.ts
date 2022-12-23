import { ActionReducerMap, createReducer, on } from '@ngrx/store';

import { IUser } from 'src/app/core/interfaces/user';
import { userActions } from './actions';

// User State
export interface IUserState {
  user: null | IUser
}

const initialUserState: IUserState = {
  user: null
}

export const userReducer = createReducer<IUserState>(
  initialUserState,
  on(userActions.loadUserSuccess, (state, { user }) => ({ ...state, user })),
  on(userActions.registerUserSuccess, (state, { user }) => ({ ...state, user })),
  on(userActions.registerUserFailure, (state, { error }) => {
    console.error(`Register Failure: ${error}`);
    return { ...initialUserState }
  }),
  on(userActions.loginUserSuccess, (state, { user }) => ({ ...state, user })),
  on(userActions.loginUserFailure, (state, { error }) => {
    console.error(`Login Failure: ${error}`);
    return { ...initialUserState }
  }),
  on(userActions.logoutUserSuccess, (state) => ({ ...initialUserState })),
  on(userActions.logoutUserFailure, (state, { error }) => {
    console.error(`Logout Failure: ${error}`);
    return { ...state }
  }),
)

// Auth State
export interface IAuthState {
  userState: IUserState
}

export const authReducers: ActionReducerMap<IAuthState> = {
  userState: userReducer
}
export const authModuleStoreName = 'auth';