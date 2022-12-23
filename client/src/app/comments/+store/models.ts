import { Injectable } from "@angular/core";

import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { filter, first, map, merge, shareReplay } from "rxjs";
import { commentListActions } from "./actions";
import { commentListSelectors } from "./selectors";


@Injectable({
  providedIn: 'root'
})
export class CommentModel {
  comments$ = this.store.select(commentListSelectors.commentList);

  loadComments$ = this.actions$.pipe(ofType(commentListActions.loadComments));
  loadCommentsSuccess$ = this.actions$.pipe(ofType(commentListActions.loadCommentsSuccess));
  loadCommentsFailure$ = this.actions$.pipe(ofType(commentListActions.loadCommentsFailure));

  isLoading$ = merge(
    [true],
    this.loadComments$.pipe(map(() => true)),
    this.loadCommentsSuccess$.pipe(map(() => false)),
    this.loadCommentsFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1)); // shareReplay - if someone subscribes later on (for some reason) he gets the last value

  createComment$ = this.actions$.pipe(ofType(commentListActions.createComment));
  createCommentSuccess$ = this.actions$.pipe(ofType(commentListActions.createCommentSuccess));
  createCommentFailure$ = this.actions$.pipe(ofType(commentListActions.createCommentFailure));

  isCreating$ = merge(
    [false],
    this.createComment$.pipe(map(() => true)),
    this.createCommentSuccess$.pipe(map(() => false)),
    this.createCommentFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  editComment$ = this.actions$.pipe(ofType(commentListActions.editComment));
  editCommentSuccess$ = this.actions$.pipe(ofType(commentListActions.editCommentSuccess));
  editCommentFailure$ = this.actions$.pipe(ofType(commentListActions.editCommentFailure));

  isEditing$ = merge(
    [false],
    this.editComment$.pipe(map(() => true)),
    this.editCommentSuccess$.pipe(map(() => false)),
    this.editCommentFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  deleteComment$ = this.actions$.pipe(ofType(commentListActions.deleteComment));
  deleteCommentSuccess$ = this.actions$.pipe(ofType(commentListActions.deleteCommentSuccess));
  deleteCommentFailure$ = this.actions$.pipe(ofType(commentListActions.deleteCommentFailure));

  isDeleting$ = merge(
    [false],
    this.deleteComment$.pipe(map(() => true)),
    this.deleteCommentSuccess$.pipe(map(() => false)),
    this.deleteCommentFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  loadComments(articleId: string) {
    this.store.dispatch(commentListActions.loadComments({ articleId }));
  }

  loadCommentsClear() {
    this.store.dispatch(commentListActions.loadCommentsClear());
  }

  loadCommentsCancel() {
    this.store.dispatch(commentListActions.loadCommentsCancel());
  }

  createComment(articleId: string, text: string) {
    this.store.dispatch(commentListActions.createComment({ articleId, text }));
  }

  editComment(commentId: string, text: string) {
    this.store.dispatch(commentListActions.editComment({ commentId, text }))
  }

  deleteComment(commentId: string) {
    this.store.dispatch(commentListActions.deleteComment({ commentId }))
  }

  handleDestroy() {
    this.isLoading$.pipe(first(), filter(isLoading => !!isLoading))
      .subscribe(() => this.loadCommentsCancel())
    this.loadCommentsClear();
  }
}
