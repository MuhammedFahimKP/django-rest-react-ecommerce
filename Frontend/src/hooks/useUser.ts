import { useState } from "react";

import { createUserService } from "../services/user-service";


export const useSignup = (data:any) => {

    const [response,setResponse ] = useState({})

    const serivce = createUserService()
    serivce.signup(data).then((res) => {
        setResponse(res) 
    }).catch((err) => {
        setResponse(err)
    })

    return response

}