import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import {store} from '../store';
import { setAuthTokens,logout} from '../store/authenticationSlice'

const axiosService = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosService.interceptors.request.use(async (config) => {
    const { access } = store.getState().auth;

    if (access !== null) {
        config.headers.Authorization = 'Bearer ' + access;
        // @ts-ignore
        console.log( JSON.stringify(access));
    }
    return config;
});

axiosService.interceptors.response.use(
    (res) => {
        // @ts-ignore
        console.log('[Response]',res);
        return Promise.resolve(res);
    },
    (err) => {
        console.log(
            err
        );
        return Promise.reject(err);
    }
);

// @ts-ignore
const refreshAuthLogic = async (failedRequest) => {
    const { refresh } = store.getState().auth;
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
                const { access,refresh } = resp.data;
                failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
                store.dispatch(setAuthTokens({access:access,refresh:refresh}));
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    console.log('userlogouted')
                }
            });
    }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher<T = any>(url: string) {
    return axiosService.get<T>(url).then((res) => {
        console.log(res)
        return res.data
    }).catch((err) =>{
        console.log(err)
        return err.response.data
    });
}

export default axiosService;