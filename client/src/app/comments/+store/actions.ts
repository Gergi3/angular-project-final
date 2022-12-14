import { createAction, props } from "@ngrx/store";

import { IComment } from "src/app/core/interfaces/comment";

const namespace = '[COMMENTS MODULE]'

const loadComments = createAction(`${namespace} Load Comments`, props<{ articleId: string }>());
const loadCommentsSuccess = createAction(`${namespace} Load Comments Success`, props<{ commentList: IComment[] }>());
const loadCommentsFailure = createAction(`${namespace} Load Comments Failure`, props<{ error: any }>());
const loadCommentsCancel = createAction(`${namespace} Load Comments Cancel`);
const loadCommentsClear = createAction(`${namespace} Load Comments Clear`);

const createComment = createAction(`${namespace} Create Comment`, props<{ articleId: string, text: string }>());
const createCommentSuccess = createAction(`${namespace} Create Comment Success`, props<{ comment: IComment }>());
const createCommentFailure = createAction(`${namespace} Create Comment Failure`, props<{ error: any }>());

const editComment = createAction(`${namespace} Edit Comment`, props<{ commentId: string, text: string }>())
const editCommentSuccess = createAction(`${namespace} Edit Comment Success`, props<{ comment: IComment }>())
const editCommentFailure = createAction(`${namespace} Edit Comment Failure`, props<{ error: any }>())

const deleteComment = createAction(`${namespace} Delete Comment`, props<{ commentId: string }>())
const deleteCommentSuccess = createAction(`${namespace} Delete Comment Success`, props<{ comment: IComment }>())
const deleteCommentFailure = createAction(`${namespace} Delete Comment Failure`, props<{ error: any }>())

export const commentListActions = {
  loadComments,
  loadCommentsSuccess,
  loadCommentsFailure,
  loadCommentsCancel,
  loadCommentsClear,
  createComment,
  createCommentSuccess,
  createCommentFailure,
  editComment,
  editCommentSuccess,
  editCommentFailure,
  deleteComment,
  deleteCommentSuccess,
  deleteCommentFailure
};
