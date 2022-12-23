import { Injectable } from "@angular/core";

import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { filter, first, map, merge, shareReplay } from "rxjs";
import { articleDetailsActions, articleListActions } from "./actions";
import { articleDetailsSelectors, articleListSelectors } from "./selectors";
import { ILoadArticlesArgs, defaultLoadArticlesArgs } from "src/app/core/interfaces/article";


@Injectable({
  providedIn: 'root'
})
export class ArticleListModel {
  articles$ = this.store.select(articleListSelectors.articleList);

  loadArticles$ = this.actions$.pipe(ofType(articleListActions.loadArticles));
  loadArticlesSuccess$ = this.actions$.pipe(ofType(articleListActions.loadArticlesSuccess));
  loadArticlesFailure$ = this.actions$.pipe(ofType(articleListActions.loadArticlesFailure));

  isLoading$ = merge(
    [true],
    this.loadArticles$.pipe(map(() => true)),
    this.loadArticlesSuccess$.pipe(map(() => false)),
    this.loadArticlesFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  loadArticles(args: ILoadArticlesArgs = defaultLoadArticlesArgs) {
    this.store.dispatch(articleListActions.loadArticles(args));
  }

  loadArticlesClear() {
    this.store.dispatch(articleListActions.loadArticlesClear());
  }

  loadArticlesCancel() {
    this.store.dispatch(articleListActions.loadArticlesCancel());
  }

  handleDestroy() {
    this.isLoading$.pipe(first(), filter(isLoading => !!isLoading))
      .subscribe(() => this.loadArticlesCancel())
    this.loadArticlesClear();
  }
}

@Injectable({
  providedIn: 'root'
})
export class ArticleDetailsModel {
  article$ = this.store.select(articleDetailsSelectors.articleDetails);

  loadArticle$ = this.actions$.pipe(ofType(articleDetailsActions.loadArticle));
  loadArticleSuccess$ = this.actions$.pipe(ofType(articleDetailsActions.loadArticleSuccess));
  loadArticleFailure$ = this.actions$.pipe(ofType(articleDetailsActions.loadArticleFailure));

  isLoading$ = merge(
    [true],
    this.loadArticle$.pipe(map(() => true)),
    this.loadArticleSuccess$.pipe(map(() => false)),
    this.loadArticleFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  constructor(
    private store: Store,
    private actions$: Actions
  ) { }

  loadArticle(id: string) {
    this.store.dispatch(articleDetailsActions.loadArticle({ id }));
  }

  loadArticleClear() {
    this.store.dispatch(articleDetailsActions.loadArticleClear());
  }

  loadArticleCancel() {
    this.store.dispatch(articleDetailsActions.loadArticleCancel());
  }

  handleDestroy() {
    this.isLoading$.pipe(first(), filter(isLoading => !!isLoading))
      .subscribe(() => this.loadArticleCancel())
    this.loadArticleClear();
  }
}