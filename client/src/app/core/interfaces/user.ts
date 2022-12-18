export interface IUser {
  _id: string
  email: string
  username: string
  phoneNumber: string | null
  isMale: string | null
  createdAt: string
  updatedAt: string
  articles: string[]
  comments: string[]
}

export interface IUserRegisterInfo {
  email: string
  username: string
  password: string
  phoneNumber: string | null
  isMale: boolean | null
}

export interface IUserLoginInfo {
  email: string
  password: string
}