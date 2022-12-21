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
    let newState = {...state, commentList: [comment] };
    if (state.commentList) {
      newState = { ...state, commentList: [ comment, ...state.commentList]  }
    }
    return newState;
  }),
)

// Comment State
export interface ICommentState {
  commentsState: ICommentListState
}

export const commentsReducers: ActionReducerMap<ICommentState> = {
  commentsState: commentListReducer,
}
export const commentsModuleStoreName = 'comment';