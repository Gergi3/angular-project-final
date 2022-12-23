import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ICommentState, commentsModuleStoreName } from "./reducers";

const getCommentsState = createFeatureSelector<ICommentState>(commentsModuleStoreName);

const getCommentList = createSelector(getCommentsState, (state) => state.commentsState.commentList)
export const commentListSelectors = {
  commentList: getCommentList
}
