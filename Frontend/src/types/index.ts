export interface UserSigninData {
    email:string;
    password:string;
}

export interface UserSignupData extends UserSigninData { 
    first_name:string;
    last_name:string;
    password2:string;
}

export interface DynamicObj{
    [key: string]: string 
}