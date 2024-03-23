import  * as CryptoJS from "crypto-js"

const password_key = import.meta.env.VITE_CRYPTO_KEY
const iv  = import.meta.env.VITE_CRYPTO_IV


export function EncryptString(str:string){
    var enc_string = CryptoJS.AES.encrypt(str,password_key ,{iv:iv}).toString();
    return enc_string;
}