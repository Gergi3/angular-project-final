import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { IArticle } from '../../core/interfaces/article';
import { articleListActions } from './actions';

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

// Article State
export interface IArticleState {
  articleListState: IArticleListState
}

export const articleReducers: ActionReducerMap<IArticleState> = {
  articleListState: articleListReducer
}
export const articleModuleStoreName = 'article';