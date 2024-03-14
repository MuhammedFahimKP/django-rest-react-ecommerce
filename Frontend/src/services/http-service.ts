import apiClient from "./api-client";

class HttpService{

    
    
    async get<FetchResponse>(endpoint:string){
        const res  = await apiClient.get<FetchResponse>(endpoint)
        const {data} = res
        return data

    }


    post<RequestData,FetchResponse>(endpoint:string,data:RequestData) {
        
        let  res = {};
        apiClient.post<FetchResponse>(endpoint,data)
        .then((response) => { 
            res =  response
        }) 
        .catch((error) => {
             res = error
        })
        
        return res

    } 
    
}

const createHttpService = () => new HttpService 

export default createHttpService