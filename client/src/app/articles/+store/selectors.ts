import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IArticleState, articleModuleStoreName, articleReducers } from "./reducers";

const getArticleState = createFeatureSelector<IArticleState>(articleModuleStoreName);

const getArticleList = createSelector(getArticleState, (state) => state.articleListState.articleList)
export const articleListSelectors = {
  articleList: getArticleList
}