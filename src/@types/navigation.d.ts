export interface MusicParams {
    id: string
    uri: string
    title: string
    cover: string
    color: string
    duration: number
    published: boolean
    author: AuthorParams
}

export interface AuthorParams {
    id: string
    name: string
    email: string
}
  
  
export declare global {
    namespace ReactNavigation {
        interface RootParamList{
            'inicio': undefined;
            'tocar': MusicParams;
        }
    }
}