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

export const defaultLoadArticlesArgs = {
  profile: false
}