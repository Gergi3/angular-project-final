import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState, authModuleStoreName } from "./reducers";

const getAuthState = createFeatureSelector<IAuthState>(authModuleStoreName);

const getUser = createSelector(getAuthState, (state) => state.userState.user)
export const userSelectors = {
  user: getUser
}