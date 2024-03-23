

export interface UserSignInData{
    email:string;
    password:string;
}


export interface UserSignUpData extends UserSignInData {
    first_name:string;
    last_name:string;
    password2:string;
}


export interface UserModelResponse{
    id:string;
    email:string;
    first_name:string;
    last_name:string;
    role: 'user' | 'admin' | 'sub admin'
}






