import { IUser } from "./user"

export interface IComment {
  text: string
  user: IUser
  article: string
  createdAt: string
  updatedAt: string
}