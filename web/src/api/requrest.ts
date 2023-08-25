import axios, { AxiosHeaders, AxiosInstance, Method } from "axios"
const WhiteCodeList : (string | number) [] = [1101]
type ResultModel<T> = {
    success : boolean
    result : T
    code : number | string
    msg : string
}

const HttpRequest  = class {
    instance : AxiosInstance
    constructor(){
        this.instance = axios.create({
            timeout:5000,
            headers:{
                'Content-Type':"application/x-www-form-urlencoded"
            },
            baseURL:"/api"
        })
        this.interceptors()
    }
    /**
     * request repsonse interceptors
     */
    private interceptors(){
        this.instance.interceptors.request.use((config)=>{
            return config
        },(error) => {
            return Promise.reject(error)
        })
        this.instance.interceptors.response.use((response) => {
            const data = response.data as ResultModel<any>
            if(data.success !== true && !WhiteCodeList.includes(data.code)){
                alert(data.msg)
                return Promise.reject(data.msg)
            }
            return response
        },(error) => {
            return Promise.reject(error)
        })
    }
    private request<T>(data:any,method:Method){
        return new Promise<ResultModel<T>>((resolve,reject) => {
            this.instance.request({
                method,
                data
            }).then((res) => {
                const data = res.data as ResultModel<T>
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })

    }
    post<T>(data?:any){
        return this.request<T>(data,'POST')
    }
    get<T>(data?:any){
        return this.request<T>(data,'GET')
    }
}

const http = new HttpRequest()
export default http