export type DynamicObj = {
  [key: string]: any;
};

export type AuthState =
  | "ACTIVATION"
  | "NOT LOGGED"
  | "TIMED OUT"
  | "FORGET PASS"
  | "LOGED IN";

export type UserAuthType = "google" | "email";

export type UserRole = "user" | "admin" | "sub admin";

export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignUpData extends UserSignInData {
  first_name: string;
  last_name: string;
}

export interface UserModelResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  auth_type: UserAuthType;
  avatar: string;
}

export interface AdminUserModel extends UserModelResponse {
  date_joined: string | Date | null;
  created: string | Date | null;
  updated: string | Date | null;
  last_login: string | Date | null;
  is_logedin: boolean;
  is_active: boolean;
}

export interface Product {
  id: string;
  name: string;
  categoery: string;
  brand: string;
  slug: string;
  colors: string[];
  sizes: string[];
}

export interface LatestArrival {
  id: string;
  name: string;
  img: string;
  brand: string;
  slug: string;
  color: string[];
}

export interface ProductForm {
  slug?: string;
  name: string;
  categoery: string;
  brand: string;
  is_active: any;
  img: any;
  discription: string;
}

export interface CartItem {
  id: string;
  img: string;
  name: string;
  brand: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
  stock: number;
  subtotal: number;
}

export interface CartResponse {
  total: number;
  cart_items: CartItem[] | [];
  itemErrors: { [key: string]: string };
}

export interface WishListProductItem {
  id: string;
  img: {
    img_1: string;
    img_2: string;
    img_3: string;
  };

  product: {
    id: string;
    name: string;
    brand: string;
    img: string;
    categoery: string;
  };

  color: string;
  size: string;
  quantity: number;
  price: number;
}
export interface WishlistItem {
  id: string;
  product: WishListProductItem;
}

export interface ColorVariation {
  id: string;
  img_id: string;
  img_1: string;
  img_2: string;
  img_3: string;
}

export interface ShippingAddress {
  id: string;
  pin_code: string;
  city: string;
  state: string;
  place: string;
  landmark: string;
  phone_no: string;
  alter_phone_no: string;
}

export interface ProductVariant {
  img: {
    id: string;
    img_1: string;
    img_2: string;
    img_3: string;
  };
  color: string;
  price: string;
  size: string;
  stock: number;
}
export interface ProductResponseData {
  id: string;
  name: string;
  brand: string;
  categoery: string;
  img: string;
  colors: string[];
  min_price: number;
  discription: string;
  slug: string;
}

export interface Order {
  id: string;
  created: string | Date;
  expected_delivery: string | null | Date;
  payment: "RAZOR PAY" | "COD";
  payment_status: "Pending" | "Paid";
  status: "Placed" | "Delivered" | "Cancelled";
  total_amount: number;
}

export interface SingleProductResponseData {
  name: string;
  discription: string;
}

export interface OrderProductResponse {
  id: string;
  product: {
    id: string;
    name: string;
    img: string;
    categoery: string;
    brand: string;
    discription: string;
  };
  img: {
    img_1: string;
    img_2: string;
    img_3: string;
  };
  size: string;
  color: string;
  price: number;
}

export interface OrderItem {
  id: string;
  product: OrderProductResponse;
  quantity: string;
}

export interface OrderFetchResponse extends Order {
  orders: OrderItem[];
}

// admin side

export interface AdminLatestOrder {
  id: string;
  user: string;
  payment: "RAZOR PAY" | "COD";
}

export interface AdminOrdersModel extends AdminLatestOrder {
  expected_delivery: string | Date | null;
  created: string | Date | null;
  updated: string;
  total_amount: string;
  status: "Placed" | "Delivered" | "Cancelled";

  payment_transation_id: string;

  payment_status: "Pending" | "Paid";
}

export interface PaginatedResponseData<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[] | [];
}

export interface AdminSingleOrderModel extends AdminOrdersModel {
  orders: OrderItem[];
  address: ShippingAddress;
}

export interface AdminDataCount {
  users: number;
  products: number;
  brand_count: number;
  orders_count: number;
}

interface AdminModelData {
  id: string;
  name: string;
  created: string;
  updated: string;
  is_active: boolean;
}

export interface AdminProductSearchQuery {
  name: string;
  category: string;
  brand: string;
}
export interface AdminProduct extends AdminModelData {
  categoery: string;
  brand: string;
  slug?: string;
  img: string;
}

export interface UpdateSizeVariation {
  id: string;
  price?: number | string;
  stock?: number;
}

export interface Variation {
  id: string;
  color: string;
  img_1: string;
  img_2: string;
  img_3: string;
  img_id: string;
}

export interface SizeVariation {
  id: string;
  size: string;
  price: string | number;
  stock: number;
}
export interface VariationWithSize extends Variation {
  size_varations: SizeVariation[] | [];
}

export interface RazorPayResponse {
  razorpay_signature: string;
  razorpay_payment_id: string;

  razorpay_order_id: string;
}

export interface TotalAmount {
  gst: number;
  shipping: number;
  orginal: number;
  total: number;
}

export type PaymentOptions = "COD" | "RAZOR PAY";

export type AdminColor = AdminModelData;
export type AdminBrand = AdminModelData;
export type AdminSize = AdminModelData;

export interface AdminCategory extends AdminModelData {
  img: string;
}
