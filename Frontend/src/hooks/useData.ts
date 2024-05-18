import { useEffect,useState } from "react";
import apiClient ,{ ApiClientCanceledError, type  ApiClientError, type ApiClientResponse }  from "../services/api-client";
import { AxiosRequestConfig } from "axios";





const useData = <T>(endpoint:string,requestConfig ?:AxiosRequestConfig,deps?:any[]) =>{

    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState<number>(0);
    const [isLoading,setLoading] = useState(false);
    
    useEffect(() => {
        
        
        const controller = new AbortController();
        
        setLoading(true)
       
        apiClient
        .get<T>(endpoint, { signal : controller.signal,...requestConfig })
          .then((res:ApiClientResponse) => { setData(res.data )
            setLoading(false)
            
        })
          .catch((err) => {
            if (err instanceof ApiClientCanceledError) return;
            if ((err as ApiClientError)?.status ){
              setError(err.status)
            }
            setLoading(false)
          });
          
        
        return  () => controller.abort();

      },deps ? [...deps] : []);

    return { data , error , isLoading ,setData}
    
}

export default useData;