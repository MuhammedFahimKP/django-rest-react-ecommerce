import apiClient from "./api-client";

class HttpService{


    
    async get<FetchResponse>(endpoint:string){
        const res  = await apiClient.get<FetchResponse>(endpoint)
        const {data} = res
        return data

    }


    async post<RequestData,FetchResponse>(endpoint:string,data:RequestData) {
        const res = await apiClient.post<FetchResponse>(endpoint,data) 
        const {data:resData} = res
        return resData

    } 
    
}

const createHttpService = () => new HttpService 

export default createHttpService