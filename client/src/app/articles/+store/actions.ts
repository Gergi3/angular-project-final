import { createAction, props } from "@ngrx/store";

import { IArticle, ICreateArticlesArgs, IEditArticlesArgs, ILoadArticlesArgs } from "src/app/core/interfaces/article";

const namespace = '[ARTICLES MODULE]'

const loadArticles = createAction(`${namespace} Load Articles`, props<ILoadArticlesArgs>());
const loadArticlesSuccess = createAction(`${namespace} Load Articles Success`, props<{ articles: IArticle[] }>());
const loadArticlesFailure = createAction(`${namespace} Load Articles Failure`, props<{ error: any }>());
const loadArticlesCancel = createAction(`${namespace} Load Articles Cancel`);
const loadArticlesClear = createAction(`${namespace} Load Articles Clear`);

const createArticle = createAction(`${namespace} Create Articles`, props<ICreateArticlesArgs>());
const createArticleSuccess = createAction(`${namespace} Create Articles Success`, props<{ article: IArticle }>());
const createArticleFailure = createAction(`${namespace} Create Articles Failure`, props<{ error: any }>());

const editArticle = createAction(`${namespace} Edit Articles`, props<IEditArticlesArgs>());
const editArticleSuccess = createAction(`${namespace} Edit Articles Success`, props<{ article: IArticle }>());
const editArticleFailure = createAction(`${namespace} Edit Articles Failure`, props<{ error: any }>());

const deleteArticle = createAction(`${namespace} Delete Articles`, props<{ articleId: string }>());
const deleteArticleSuccess = createAction(`${namespace} Delete Articles Success`, props<{ article: IArticle }>());
const deleteArticleFailure = createAction(`${namespace} Delete Articles Failure`, props<{ error: any }>());


export const articleListActions = {
  loadArticles,
  loadArticlesSuccess,
  loadArticlesFailure,
  loadArticlesCancel,
  loadArticlesClear,

  createArticle,
  createArticleSuccess,
  createArticleFailure,
  
  editArticle,
  editArticleSuccess,
  editArticleFailure,
  
  deleteArticle,
  deleteArticleSuccess,
  deleteArticleFailure
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