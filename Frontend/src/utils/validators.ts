import { DynamicObj } from "../types"


const errorFieldName:DynamicObj  =  {
    email : 'Email',
    first_name : 'Name',
    last_name : 'Name',
    password : 'Password',
    password2 : 'Confirm Password'
}


export function SignupValidator(key:string ,value:string) {


        if ( key === 'email' && value !==''){
           const  regex = /^[A-Za-z\._\-0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/
           if (!regex.test(value)) {
                return "Invalid Email"
           }
           
        }


        if (key === 'first_name' && value !== '' ){


           if (  value.length  < 4){
                return `not a valid ${errorFieldName[key]}` 
           }
        

        }
        
        if (key === 'last_name' && value !== '' ) {
            if (  value.length  <  2) {
                return `not a valid ${errorFieldName[key]}`
            }
        }
        
        if (key === "password") {
            var alphaRegex = /[a-zA-Z]/;
            var numericRegex = /[0-9]/;
            
            if (value !== '' && !alphaRegex.test(value) && !numericRegex.test(value)) {
              return "Password must contain alphanumeric Characters"
            }

            if ( value !== '' && value.length < 8) {
              return 'Passowrd must be 8 charaters'
            }
          }

       
            
        return ""

    

            

}

export {errorFieldName}