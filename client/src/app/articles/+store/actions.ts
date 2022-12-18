import { createAction, props } from "@ngrx/store";
import { IArticle } from "src/app/core/interfaces/article";

const namespace = '[ARTICLE MODULE]'

const loadArticles = createAction(`${namespace} Load Articles`);
const loadArticlesSuccess = createAction(`${namespace} Load Articles Success`, props<{ articles: IArticle[] }>());
const loadArticlesFailure = createAction(`${namespace} Load Articles Failure`, props<{ error: any }>());
const loadArticlesCancel = createAction(`${namespace} Load Articles Cancel`);
const loadArticlesClear = createAction(`${namespace} Load Articles Clear`);

export const articleListActions = {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
  loadArticlesCancel,
  loadArticlesClear
};