import axios,{AxiosError,AxiosResponse} from "axios";


export default axios.create({
    
    baseURL:'http://127.0.0.1:8000/',
    
})


export type ApiClientError  = AxiosError
export type ApiClientResponse = AxiosResponse 