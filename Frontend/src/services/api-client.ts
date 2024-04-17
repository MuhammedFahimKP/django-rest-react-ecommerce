import axios,{AxiosError,AxiosResponse} from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import  {getState,dispatch} from "../store"
import  { setAuthTokens,logout} from "../store/authenticationSlice"





const apiClient  = axios.create({
    
    baseURL:'http://127.0.0.1:8000/',
    
})

apiClient.interceptors.request.use(async (config) => {
    const { access } = getState().persistedReducer.auth;

    if (access !== null) {
        config.headers.Authorization = 'Bearer ' + access;
    
    }
    return config;
});


apiClient.interceptors.response.use(
    (res) => {

        return Promise.resolve(res);
    },
    (err) => {
       
        return Promise.reject(err);
    }
)

const refreshAuthLogic = async (failedRequest:AxiosError) => {
    const { refresh } = getState().persistedReducer.auth;
    if (refresh!== null) {
        return axios
            .post(
                'users/refresh/',
                {
                    refresh: refresh,
                },
                {
                    baseURL: 'http://127.0.0.1:8000/'
                }
            )
            .then((resp) => {
                const { access } = resp.data;
                if(failedRequest?.response){
                    failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
                }
                dispatch(setAuthTokens({access:access}));
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    dispatch(logout())
                }
            });
    }
};

createAuthRefreshInterceptor(apiClient, refreshAuthLogic);

export function fetcher<T = any>(url: string) {
    return apiClient.get<T>(url).then((res) => {
        console.log(res)
        return res.data
    }).catch((err) =>{
        console.log(err)
        return err.response.data
    });
}






export default apiClient

export type ApiClientError  = AxiosError
export type ApiClientResponse = AxiosResponse 