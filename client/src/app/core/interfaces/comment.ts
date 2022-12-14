import { IUser } from "./user"

export interface IComment {
  _id: string
  text: string
  user: IUser
  article: string
  createdAt: string
  updatedAt: string
}