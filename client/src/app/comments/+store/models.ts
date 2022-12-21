import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { commentListSelectors } from "./selectors";
import { commentListActions } from "./actions";
import { Actions, ofType } from "@ngrx/effects";
import { filter, first, map, merge, shareReplay } from "rxjs";


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

  createComments$ = this.actions$.pipe(ofType(commentListActions.createComment));
  createCommentsSuccess$ = this.actions$.pipe(ofType(commentListActions.createCommentSuccess));
  createCommentsFailure$ = this.actions$.pipe(ofType(commentListActions.createCommentFailure));

  isCreating$ = merge(
    [false],
    this.createComments$.pipe(map(() => true)),
    this.createCommentsSuccess$.pipe(map(() => false)),
    this.createCommentsFailure$.pipe(map(() => false))
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

  handleDestroy() {
    this.isLoading$.pipe(first(), filter(isLoading => !!isLoading))
      .subscribe(() => this.loadCommentsCancel())
    this.loadCommentsClear();
  }
}
