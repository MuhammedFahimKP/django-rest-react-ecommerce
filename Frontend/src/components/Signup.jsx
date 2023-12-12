import React, { useState } from 'react'
import { BrowserRouter  as Link, json } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import {jwtDecode} from  'jwt-decode'

const Signup = () =>{

    // const h = jwtDecode("eyJhbGciOiJSUzI1NiIsImtpZCI6ImU0YWRmYjQzNmI5ZTE5N2UyZTExMDZhZjJjODQyMjg0ZTQ5ODZhZmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMjk2MDYxNjU1NzkzLWJ0b203Ym1hZDZ1Z2R0OTMyMDB1N2ozdWsyMmlqZXZsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMjk2MDYxNjU1NzkzLWJ0b203Ym1hZDZ1Z2R0OTMyMDB1N2ozdWsyMmlqZXZsLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTEwNTAyMzEwMjg5MTQzNDM5Njk1IiwiYXRfaGFzaCI6ImF0TU9kVFRGODB5VWx4bUNocmllU0EiLCJpYXQiOjE3MDE2OTUyMTUsImV4cCI6MTcwMTY5ODgxNX0.FjjTDVm52Y1IWqK1EM3A75uK-0aQOFcVptA-WNmtKwZcFq4xAKmV1hutW4cxTybspduG5BqHtsgRR_jz2Mryvy9yvuctWSgcxZZr_UfwgN1XnXS8y-sUtHJ3M1GmiZ8JroTpJTz_xpH9J7kNKbM-05xkJpAU5d-v-yaA5Krhnfa6AJwxOjdmSdpxawC2w5knpgtfjU4KeVpeNFpVV9AkbAvNJsiSjDtHrUS39a4Z1htcMKgLMnsTWjm9q10NbMOaOt5NoaGzIhQpbstDXLEcKFUV61V2F70qhiOvSO_EJ1cf84z9B2CKRQizvXQ7fZz1DUMf5novkBAH_TU8GsIFNQ")
    // console.log(h)
 {
    return (
        <div>
        <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50">
            <div>
                <a href="/">
                    <h3 className="text-4xl font-bold text-purple-600">
                        Logo
                    </h3>
                </a>
            </div>
            <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-lg sm:rounded-lg">
                <form method='post'>
                <div >
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Email
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="email"
                                name="email"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex">
                        <div className='flex-1'>
                            <label
                                htmlFor="firs_name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                               First Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="first_name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        <div className='flex-1'>
                            <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Last Name
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="text"
                                    name="last_name"
                                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Password
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="password"
                                name="password"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="password_confirmation"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Confirm Password
                        </label>
                        <div className="flex flex-col items-start">
                            <input
                                type="password"
                                name="password_confirmation"
                                className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>
                    </div>
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="flex items-center mt-4">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                            Register
                            
                        </button>
                    </div>
                </form>
                <div className="mt-4 text-grey-600">
                    Already have an account?{" "}
                    <span>
                        
                        
                    </span>
                </div>
                <div className="flex items-center w-full my-4">
                    <hr className="w-full" />
                    <p className="px-3 ">OR</p>
                    <hr className="w-full" />
                </div>
                <div className="my-6 space-y-2">
                    <GoogleOAuthProvider clientId="274673302426-torustv2d8egr2ijla30p2onlr0i1l9m.apps.googleusercontent.com">
                    
                            <GoogleLogin

                                onSuccess={(credentialResponse) => {

                                   if ( '296061655793-btom7bmad6ugdt93200u7j3uk22ijevl.apps.googleusercontent.com' ==='296061655793-btom7bmad6ugdt93200u7j3uk22ijevl.apps.googleusercontent.com'){
                                    console.log('client ok')
                                   }
                                   
            
                            

                                    console.log(credentialResponse)
                                   

                                   

                                    const SignInEndPoint = "http://127.0.0.1:8000/api/google/"
                                    
                                    console.log(credentialResponse.credential)

                                    // fetch(SignInEndPoint,{
                                    //     method : "POST",
                                    //     headers : {
                                    //         'Content-Type': 'application/json',
                                    //     },
                                    //     body:JSON.stringify(TokenObject)
                                    
                                
                                    // }) .then(response => {
                                    //     if (!response.ok) {
                                
                                
                                    //         // writeToContent(error=response.code)
                                
                                    //         // throw new Error(`HTTP error! Status: ${response.status}`);
                                            
                                    //     }
                                    //     return response.json();
                                    // })
                                    // .then(authData =>{
                                    //     // handleAuthData(authData,getProduct)
                                    //     console.log(authData)
                                    // })
                                    // .catch(error => {
                                    //     // Handle errors here
                                    //     console.log('Error:', error);
                                      
                                    // });



                                    
                                }}

                                onError={() => {
                                    console.log('login failed')
                                }}



                            >
                            ;    
                            </GoogleLogin>
                    </GoogleOAuthProvider>
                    
                    <button
                        aria-label="Login with GitHub"
                        role="button"
                        className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                            className="w-5 h-5 fill-current"
                        >
                           
                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                        </svg>
                        <p>Login with GitHub</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

export default Signup