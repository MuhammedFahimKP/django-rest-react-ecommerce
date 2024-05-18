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

export function checkAnyCahngeOccured<T extends Object>(obj1:T, obj2:T) {
  const changedValues: Partial<T> = {};

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
            if (obj1[key] !== obj2[key]) {
                changedValues[key as keyof T] = obj2[key];
            }
        }
    }

    if (Object.keys(changedValues).length === 0) {
        return false;
    } else {
        return changedValues as T;
    }
}




export function setEmptyField(formObj:DynamicObj,setFromErrorObj:Function){
  return new Promise<void>((resolve, reject) => {
    console.log('inside form validator');
    for (const key in formObj) {
      if (formObj[key] === "") {
        console.log(key);
        setFromErrorObj((p:DynamicObj) => {
          const newError = { ...p };
          newError[key] = `please provide a ${errorFieldName[key]}`;
          return newError;
        });
      }
    }
    console.log('loop ended');
    resolve(); // Resolve the promise when the loop completes
  });
}




export {errorFieldName}
