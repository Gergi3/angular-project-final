import { createAction, props } from "@ngrx/store";
import { IArticle } from "src/app/core/interfaces/article";

const namespace = '[ARTICLES MODULE]'

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

const loadArticle = createAction(`${namespace} Load Article`, props<{ id: string }>());
const loadArticleSuccess = createAction(`${namespace} Load Article Success`, props<{ article: IArticle }>());
const loadArticleFailure = createAction(`${namespace} Load Article Failure`, props<{ error: any }>());
const loadArticleCancel = createAction(`${namespace} Load Article Cancel`);
const loadArticleClear = createAction(`${namespace} Load Article Clear`);

export const articleDetailsActions = {
  loadArticle,
  loadArticleSuccess,
  loadArticleFailure,
  loadArticleCancel,
  loadArticleClear
};