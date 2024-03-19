import { useState } from "react";
import { DynamicObj} from "../types";
import { createUserService } from "../services/user-service";


export const useSignup = (data:any) => {

    const [response,setResponse ] = useState<DynamicObj|{}>({})

    const serivce = createUserService()
    serivce.signup(data).then((res) => {
        setResponse(res) 
    }).catch((err) => {
        setResponse(err)
    })

    return response

}