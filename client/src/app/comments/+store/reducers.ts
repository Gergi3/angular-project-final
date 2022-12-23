import { ActionReducerMap, createReducer, on } from '@ngrx/store';

import { IComment } from '../../core/interfaces/comment';
import { commentListActions } from './actions';

// Comment  State
export interface ICommentListState {
  commentList: null | IComment[]
}

const initialcommentListState: ICommentListState = {
  commentList: null
}

export const commentListReducer = createReducer<ICommentListState>(
  initialcommentListState,
  on(commentListActions.loadCommentsSuccess, (state, { commentList }) => ({ ...state, commentList })),
  on(commentListActions.loadCommentsClear, () => ({ ...initialcommentListState })),

  on(commentListActions.createCommentSuccess, (state, { comment }) => {
    if (state.commentList === null) { return { ...state } }

    let newState = { ...state, commentList: [comment] };
    if (state.commentList) {
      newState = { ...state, commentList: [comment, ...state.commentList] }
    }
    return newState;
  }),

  on(commentListActions.editCommentSuccess, (state, { comment }) => {
    if (state.commentList === null) { return { ...state } }

    const commentIndex = state.commentList.findIndex(x => x._id === comment._id);
    const newCommentList = [...state.commentList];
    newCommentList[commentIndex] = comment;

    return { ...state, commentList: newCommentList };
  }),

  on(commentListActions.deleteCommentSuccess, (state, { comment }) => {
    if (state.commentList === null) { return { ...state } }

    const commentIndex = state.commentList.findIndex(x => x._id === comment._id);
    const newCommentList = [...state.commentList];
    newCommentList.splice(commentIndex, 1);

    return { ...state, commentList: newCommentList }
  })
)

// Comment State
export interface ICommentState {
  commentsState: ICommentListState
}

export const commentsReducers: ActionReducerMap<ICommentState> = {
  commentsState: commentListReducer,
}
export const commentsModuleStoreName = 'comment';