import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleService } from "../article.service";
import { articleDetailsActions, articleListActions } from "./actions";
import { takeUntil, map, switchMap, catchError, mergeMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ArticleModuleEffects {

  loadArticles$ = createEffect(() => this.actions$.pipe(
    ofType(articleListActions.loadArticles),
    switchMap((args) => this.articleService.getAll(args).pipe(
      takeUntil(this.actions$.pipe(ofType(articleListActions.loadArticlesCancel))),
      map(articles => articleListActions.loadArticlesSuccess({ articles })),
      catchError(error => [articleListActions.loadArticlesFailure({ error })])
    ))
  ));

  loadArticle$ = createEffect(() => this.actions$.pipe(
    ofType(articleDetailsActions.loadArticle),
    switchMap(({ id }) => this.articleService.getById(id).pipe(
      takeUntil(this.actions$.pipe(ofType(articleDetailsActions.loadArticleCancel))),
      map(article => articleDetailsActions.loadArticleSuccess({ article })),
      catchError(error => [articleDetailsActions.loadArticleFailure({ error })])
    ))
  ));

  createArticle$ = createEffect(() => this.actions$.pipe(
    ofType(articleListActions.createArticle),
    switchMap((args) => this.articleService.create(args).pipe(
      map(article => articleListActions.createArticleSuccess({ article })),
      catchError(error => [articleListActions.createArticleFailure({ error })])
    ))
  ));

  editArticle$ = createEffect(() => this.actions$.pipe(
    ofType(articleListActions.editArticle),
    switchMap((args) => this.articleService.edit(args).pipe(
      map(article => articleListActions.editArticleSuccess({ article })),
      catchError(error => [articleListActions.editArticleFailure({ error })])
    ))
  ));

  deleteArticle$ = createEffect(() => this.actions$.pipe(
    ofType(articleListActions.deleteArticle),
    switchMap(({ articleId }) => this.articleService.delete(articleId).pipe(
      map(article => articleListActions.deleteArticleSuccess({ article })),
      catchError(error => [articleListActions.deleteArticleFailure({ error })])
    ))
  ));

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) { }
}