import { Injectable } from "@angular/core";

import { Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";

import { filter, first, map, merge, shareReplay } from "rxjs";
import { articleDetailsActions, articleListActions } from "./actions";
import { articleDetailsSelectors, articleListSelectors } from "./selectors";
import { ICreateArticlesArgs, IEditArticlesArgs, ILoadArticlesArgs, defaultLoadArticlesArgs } from "src/app/core/interfaces/article";
import { UserModel } from "src/app/auth/+store/models";


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

  createArticle$ = this.actions$.pipe(ofType(articleListActions.createArticle));
  createArticleSuccess$ = this.actions$.pipe(ofType(articleListActions.createArticleSuccess));
  createArticleFailure$ = this.actions$.pipe(ofType(articleListActions.createArticleFailure));

  isCreating$ = merge(
    [true],
    this.createArticle$.pipe(map(() => true)),
    this.createArticleSuccess$.pipe(map(() => false)),
    this.createArticleFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  editArticle$ = this.actions$.pipe(ofType(articleListActions.editArticle));
  editArticleSuccess$ = this.actions$.pipe(ofType(articleListActions.editArticleSuccess));
  editArticleFailure$ = this.actions$.pipe(ofType(articleListActions.editArticleFailure));

  isEditing$ = merge(
    [true],
    this.editArticle$.pipe(map(() => true)),
    this.editArticleSuccess$.pipe(map(() => false)),
    this.editArticleFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  deleteArticle$ = this.actions$.pipe(ofType(articleListActions.deleteArticle));
  deleteArticleSuccess$ = this.actions$.pipe(ofType(articleListActions.deleteArticleSuccess));
  deleteArticleFailure$ = this.actions$.pipe(ofType(articleListActions.deleteArticleFailure));

  isDeleting$ = merge(
    [true],
    this.deleteArticle$.pipe(map(() => true)),
    this.deleteArticleSuccess$.pipe(map(() => false)),
    this.deleteArticleFailure$.pipe(map(() => false))
  ).pipe(shareReplay(1));

  isDoingAction$ = merge(
    [false],
    this.isLoading$.pipe(map(x => x)),
    this.isEditing$.pipe(map(x => x)),
    this.isCreating$.pipe(map(x => x)),
    this.isDeleting$.pipe(map(x => x)),
    [false]
  ).pipe(shareReplay(1));

  constructor(
    private store: Store,
    private actions$: Actions,
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
  
  createArticle(args: ICreateArticlesArgs) {
    this.store.dispatch(articleListActions.createArticle(args));
  }

  editArticle(args: IEditArticlesArgs) {
    this.store.dispatch(articleListActions.editArticle(args));
  }

  deleteArticle(articleId: string) {
    this.store.dispatch(articleListActions.deleteArticle({ articleId }));
  }


  // TODO: Figure out
  // getIsOwner(id: string) {
    
  //   return forkJoin({
  //     user: this.userModel.user$,
  //     article: this.articles$.pipe(
  //       map(articles => articles?.find(x => x._id === id) || null),
  //       map(article => console.log(article); return article;),
  //       take(1)
  //     )
  //   }).pipe(map(({ user, article }) => {
  //     let a = !!(user && article && user._id === article.user._id)
  //     console.log(a);
      
  //     return a;
  //   }))
  // }

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

  // isOwner$ = forkJoin({
  //   user: this.userModel.user$,
  //   article: this.article$
  // }).pipe(map(({ user, article }) => !!(user && article && user._id === article.user._id)))

  constructor(
    private store: Store,
    private actions$: Actions,
    private userModel: UserModel
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