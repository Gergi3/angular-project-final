import { createAction, props } from "@ngrx/store";
import { IUser, IUserLoginInfo, IUserRegisterInfo } from "src/app/core/interfaces/user";

const namespace = '[AUTH MODULE]'

const loadUser = createAction(`${namespace} Load User`);
const loadUserSuccess = createAction(`${namespace} Load User Success`, props<{ user: IUser }>());
const loadUserFailure = createAction(`${namespace} Load User Failure`, props<{ error: any }>());
const loadUserCancel = createAction(`${namespace} Load User Cancel`);

const registerUser = createAction(`${namespace} Register User`, props<{ userInfo: IUserRegisterInfo }>());
const registerUserSuccess = createAction(`${namespace} Register User Success`, props<{ user: IUser }>());
const registerUserFailure = createAction(`${namespace} Register User Failure`, props<{ error: any }>());

const loginUser = createAction(`${namespace} Login User`, props<{ userInfo: IUserLoginInfo }>());
const loginUserSuccess = createAction(`${namespace} Login User Success`, props<{ user: IUser }>());
const loginUserFailure = createAction(`${namespace} Login User Failure`, props<{ error: any }>());

const logoutUser = createAction(`${namespace} Logout User`);
const logoutUserSuccess = createAction(`${namespace} Logout User Success`);
const logoutUserFailure = createAction(`${namespace} Logout User Failure`, props<{ error: any }>());

export const userActions = {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  loadUserCancel,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  logoutUserSuccess,
  logoutUserFailure
};