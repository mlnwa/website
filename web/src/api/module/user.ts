import http from "../requrest"

interface Login {
    userName:string
    password:string
}
export const Login = (params:Login) => http.post<string>(params)