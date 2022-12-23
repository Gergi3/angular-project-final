import { ActionReducerMap, createReducer, on } from '@ngrx/store';

import { IArticle } from '../../core/interfaces/article';
import { articleDetailsActions, articleListActions } from './actions';

// Article List State
export interface IArticleListState {
  articleList: null | IArticle[]
}

const initialArticleListState: IArticleListState = {
  articleList: null
}

export const articleListReducer = createReducer<IArticleListState>(
  initialArticleListState,
  on(articleListActions.loadArticlesSuccess, (state, { articles }) => ({ ...state, articleList: articles })),
  on(articleListActions.loadArticlesClear, () => ({ ...initialArticleListState })),
  // on(articleListActions.createArticleSuccess, (state, { article }) => {
  //   if (state.articleList === null) {
  //     return { ...state, articleList: [article] }
  //   }

  //   return { ...state, articleList: [article, ...state.articleList] };
  // }),
  // on(articleListActions.editArticleSuccess, (state, { article }) => {
  //   if (state.articleList === null) { return { ...state } }

  //   const articleIndex = state.articleList.findIndex(x => x._id === article._id);
  //   const newArticleList = [...state.articleList];
  //   newArticleList[articleIndex] = article;

  //   return { ...state, articleList: newArticleList };
  // }),
  // on(articleListActions.deleteArticleSuccess, (state, { article }) => {
  //   if (state.articleList === null) { return { ...state } }

  //   const articleIndex = state.articleList.findIndex(x => x._id === article._id);
  //   const newArticleList = [...state.articleList];
  //   newArticleList.splice(articleIndex, 1);

  //   return { ...state, articleList: newArticleList }
  // })
)

// Article Details State
export interface IArticleDetailsState {
  articleDetails: null | IArticle
}

const initialArticleDetailsState: IArticleDetailsState = {
  articleDetails: null
}

export const articleDetailsReducer = createReducer<IArticleDetailsState>(
  initialArticleDetailsState,
  on(articleDetailsActions.loadArticleSuccess, (state, { article }) => ({ ...state, articleDetails: article })),
  on(articleDetailsActions.loadArticleClear, () => ({ ...initialArticleDetailsState }))
)

// Article State
export interface IArticleState {
  articleListState: IArticleListState
  articleDetailsState: IArticleDetailsState
}

export const articleReducers: ActionReducerMap<IArticleState> = {
  articleListState: articleListReducer,
  articleDetailsState: articleDetailsReducer
}
export const articleModuleStoreName = 'article';