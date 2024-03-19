import apiClient from "./api-client";

class HttpService{

    
    
    get<FetchResponse>(endpoint:string){
        return apiClient.get<FetchResponse>(endpoint)
    }


    post<RequestData,FetchResponse>(endpoint:string,data:RequestData) {
        return apiClient.post<FetchResponse>(endpoint,data)
    } 
    
}

const createHttpService = () => new HttpService 

export default createHttpService