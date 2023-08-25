import http from "../requrest";

interface Blog {
    id      : number;
    title   : string;
    content : string;
    createAt: string;
    updateAt: string;
}
interface PageParams   {
    pageIndex: number
    pageSize : number
}
interface QueryAllBlogs extends PageParams {

}

interface Pagination<T> {
    pageIndex: number
    pageSize : number
    prePage  : number
    nextPage : number
    pages    : number
    total    : number

    isLastPage : boolean
    isFirstPage: boolean
    hasNextPage: boolean
    hasPrePage : boolean

    list: T[]
}

export const QueryAllBlogs = (params:QueryAllBlogs) => http.get<Pagination<Blog>>(params) 