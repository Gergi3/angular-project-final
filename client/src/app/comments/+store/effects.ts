import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CommentService } from "../comment.service";
import { commentListActions } from "./actions";
import { takeUntil, map, switchMap, catchError, mergeMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class CommentModuleEffects {

  loadComments$ = createEffect(() => this.actions$.pipe(
    ofType(commentListActions.loadComments),
    switchMap(({ articleId }) => this.commentService.getComments(articleId).pipe(
      takeUntil(this.actions$.pipe(ofType(commentListActions.loadCommentsCancel))),
      map(commentList => commentListActions.loadCommentsSuccess({ commentList })),
      catchError(error => [commentListActions.loadCommentsFailure({ error })])
    ))
  ));

  createComment$ = createEffect(() => this.actions$.pipe(
    ofType(commentListActions.createComment),
    switchMap(({ articleId, text }) => this.commentService.createComment(articleId, text).pipe(
      takeUntil(this.actions$.pipe(ofType(commentListActions.loadCommentsCancel))),
      map(comment => commentListActions.createCommentSuccess({ comment })),
      catchError(error => [commentListActions.createCommentFailure({ error })])
    ))
  ));

  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) { }
}