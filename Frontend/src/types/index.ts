export type   DynamicObj  =  {
    [key:string]:any
}
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

interface Product{
    id:string,
    name:string,
    categoery:string,
    brand:string,
    slug:string,
    colors:string[]
    sizes:string[]
}


export interface ProductForm {
    
    slug?:string;
    name: string;
    categoery: string;
    brand: string;
    is_active: any;
    img: any;
    discription:string;
  }

export interface CartItem{
    
    id:string,
    img:string
    name:string,
    brand:string
    color:string,
    size:string,
    quantity:number,
    price:number,
    stock:number,
    sub_total:number,
    
}

export interface Whishlist {
    id:string,
    name:string,
    product:Product,
}





// admin side

interface AdminModelData{
    id:string;
    name:string
    created:string;
    updated:string;
    is_active:boolean;
}


export interface AdminSize {

    id:string;
    name:string;

}
export interface AdminProductSearchQuery{
    name:string;
    category:string;
    brand:string;

}
export interface AdminProduct extends AdminModelData {
    categoery: string; 
    brand: string;
    slug?:string;
    img: string;
  
}


export interface UpdateSizeVariation {
    id:string;
    price?:number | string; 
    stock?:number
}

export interface Variation{

    id:string;
    color:string;
    img_1:string;
    img_2:string;
    img_3:string;
    img_id:string;

}

export interface SizeVariation {
    id:string;
    size:string;
    price:string | number;
    stock : number ;
}
export interface VariationWithSize extends Variation {
    size_varations:SizeVariation[] | []
}




export type AdminColor    = AdminModelData     
export type AdminBrand    = AdminModelData
export type AdminCategory = AdminModelData
