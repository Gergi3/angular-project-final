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

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) { }
}