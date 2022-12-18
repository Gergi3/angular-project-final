import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ArticleService } from "../article.service";
import { articleListActions } from "./actions";
import { takeUntil, map, switchMap, catchError, mergeMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable()
export class ArticleModuleEffects {

  loadArticles$ = createEffect(() => this.actions$.pipe(
    ofType(articleListActions.loadArticles),
    switchMap(() => this.articleService.getAll().pipe(
      takeUntil(this.actions$.pipe(ofType(articleListActions.loadArticlesCancel))),
      map(articles => articleListActions.loadArticlesSuccess({ articles })),
      catchError(error => [articleListActions.loadArticlesFailure({ error })])
    ))
  ));

  constructor(
    private actions$: Actions,
    private articleService: ArticleService
  ) { }
}