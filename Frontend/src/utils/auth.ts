
import axios from "axios"
import apiClient, { ApiClientError, ApiClientResponse } from "../services/api-client";
import { State } from "../store/authenticationSlice";



function handleGoogleAuth(id:string) : null | State  {

    console.log("id token",id)

    axios.post('https://liable-melamie-fkpsoftwaresolutions.koyeb.app/users/google-auth/',{ id_token : id } ).then((res:ApiClientResponse) => {
        if (res.status === 200 ){ 
            console.log(res)
            // store.dispatch(setUser(res.data.user))
            // store.dispatch(setAuthTokens({ access:res.data.access ,refresh:res.data.refresh}))
            
        }
        
    }).catch((err:ApiClientError) => {
        let error = err.response?.data
        error  
        
    })

    return null
}



export {handleGoogleAuth}