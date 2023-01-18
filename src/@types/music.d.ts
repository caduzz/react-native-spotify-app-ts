export interface MusicParams {
    id: string
    uri: string
    title: string
    cover: string
    color: string
    duration: number
    published: boolean
    author: AuthorParams
    date: Date
}

export interface AuthorParams {
    id: string
    name: string
}

export type UserParams = UserLogged |UserWowNotLogged;

export interface UserLogged {
    id: string
    name: string
    email: string
    author: boolean
    token: string
    logged: true
}

export interface UserWowNotLogged {
    logged: false
}
