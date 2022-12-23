import { IUser } from "./user"

export interface IArticle {
  _id: string
  title: string
  summary: string
  description: string
  imageUrl: string
  user: IUser
  comments: string[]
  createdAt: string
  updatedAt: string
}

export interface ILoadArticlesArgs {
  profile: boolean
}

export interface ICreateArticlesArgs {
  title: string
  summary: string
  description: string
  imageUrl: string | null
}

export interface IEditArticlesArgs {
  articleId: string,
  title: string
  summary: string
  description: string
  imageUrl: string | null
}

export const defaultLoadArticlesArgs = {
  profile: false
}