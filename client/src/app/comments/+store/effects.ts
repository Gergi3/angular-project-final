import { Injectable } from "@angular/core";

import { Actions, createEffect, ofType } from "@ngrx/effects";

import { catchError, map, switchMap, takeUntil } from "rxjs";
import { CommentService } from "../comment.service";
import { commentListActions } from "./actions";

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
      map(comment => commentListActions.createCommentSuccess({ comment })),
      catchError(error => [commentListActions.createCommentFailure({ error })])
    ))
  ));

  editComment$ = createEffect(() => this.actions$.pipe(
    ofType(commentListActions.editComment),
    switchMap(({ commentId, text }) => this.commentService.editComment(commentId, text).pipe(
      map(comment => commentListActions.editCommentSuccess({ comment })),
      catchError(error => [commentListActions.editCommentFailure({ error })])
    ))
  ));

  deleteComment$ = createEffect(() => this.actions$.pipe(
    ofType(commentListActions.deleteComment),
    switchMap(({ commentId }) => this.commentService.deleteComment(commentId).pipe(
      map(comment => commentListActions.deleteCommentSuccess({ comment })),
      catchError(error => [commentListActions.deleteCommentFailure({ error })])
    ))
  ))

  constructor(
    private actions$: Actions,
    private commentService: CommentService
  ) { }
}