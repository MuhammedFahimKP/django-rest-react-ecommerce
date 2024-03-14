import createHttpService from "./http-service";


interface UserSigninData {
    email:string;
    password:string;
}

interface UserSignupData extends UserSigninData { 
    first_name:string;
    last_name:string;
    password2:string;
}






class User {
    
    endpoint = 'users/' 
    service;


    constructor(){
        
        this.service = createHttpService()

    }
    
    signup(data:UserSignupData) {
        return this.service.post(this.endpoint + 'signup/',data)
    }

    signin(data:UserSigninData) {
        return this.service.post(this.endpoint+'signin/',data)
    }


    


}

const createUserService = () => new User()


export {createUserService}







