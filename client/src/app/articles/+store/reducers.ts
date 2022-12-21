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
  on(articleListActions.loadArticlesClear, () => ({ ...initialArticleListState }))
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