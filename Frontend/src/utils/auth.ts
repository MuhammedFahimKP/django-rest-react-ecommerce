
import {store } from "../store"
import {setUser,setAuthTokens} from "../store/authenticationSlice"
import apiClient, { ApiClientError, ApiClientResponse } from "../services/api-client";
import { State } from "../store/authenticationSlice";
import routes from "../routes"


function handleGoogleAuth(id:string) : null | State  {

    console.log(id)

    apiClient.post('users/google/',{ access_token : id } ).then((res:ApiClientResponse) => {
        if (res.status === 200 ){ 
            console.log(res)
            store.dispatch(setUser(res.data.user))
            store.dispatch(setAuthTokens({ access:res.data.access ,refresh:res.data.refresh}))
            routes.navigate('/')
        }
        
    }).catch((err:ApiClientError) => {
        let error = err.response?.data
        error  
        
    })

    return null
}



export {handleGoogleAuth}