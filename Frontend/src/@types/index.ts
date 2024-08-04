export type DynamicObj = {
  [key: string]: any;
};
export interface UserSignInData {
  email: string;
  password: string;
}

export interface UserSignUpData extends UserSignInData {
  first_name: string;
  last_name: string;
  password2: string;
}

export interface UserModelResponse {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: "user" | "admin" | "sub admin";
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

const j = {
  id: "15d9502d-4a6b-4dcc-82d2-d4cbef1fe1c3",
  orders: [
    {
      id: "a930c438-07bd-45bf-8e61-57e7884f8ef8",
      product: {
        product: "Men Navy Advanced Rapid Dry T-shirt",
        img: {
          id: "2cfe78f8-9200-4961-a982-618f10883764",
          img_id:
            "16e39d92-65b9-4829-8c41-20ba1960ce8b 4fe606ff-54bc-42c6-994c-0126ce311f04",
          img_1:
            "http://127.0.0.1:8000/media/prdv1/94412956-cdc5-46e6-ae24-ddf43753bb861646042819162-HRX-by-Hrithik-Roshan-Men-Navy-_kK2aLcX.webp",
          img_2: "http://127.0.0.1:8000/media/prdv2/hrxblutshirt.jpg",
          img_3: "http://127.0.0.1:8000/media/prdv3/hrxbluetshirt3.jpg",
        },
        size: "S",
        color: "Navy",
      },
      quantity: 1,
    },
  ],
  total_amount: "0.00",
  created: "2024-07-12 12:26:22",
  status: "Placed",
  // address: {
  //   state: "Kerala",
  //   place: "Palazhi",
  //   city: "PatheranKavu",
  //   pin_code: "673014",
  //   landmark: "Hilite Bussiness Park",
  //   phone_no: "8921212828",
  //   alter_phone_no: "9048005413",
  // },
  payment_type: "RAZOR PAY",
  payment_status: "Pending",
};

const k = {
  id: "1781e6ce-3e7f-4972-85b2-f7ab81f116f0",
  user: "fahimmuhammedfahimkp@gmail.com",
  expected_delivery: "2024-08-09T15:39:48.159532Z",
  created: "2024-07-21T15:39:48.159532Z",
  updated: "2024-07-21T15:40:06.009759Z",
  total_amount: "0.00",
  status: "Placed",
  payment: "RAZOR PAY",
  payment_status: "Paid",
  payment_transation_id: "pay_ObKp5QgIcdoYAf",
};

// admin side

export interface AdminOrdersModel {
  id: string;
  user: string;
  expected_delivery: string | Date | null;
  created: string | Date | null;
  updated: string;
  total_amount: string;
  status: "Placed" | "Delivered" | "Cancelled";
  payment: "RAZOR PAY" | "COD";
  payment_transation_id: string;

  payment_status: "Pending" | "Paid";
}

export interface AdminSingleOrderModel extends AdminOrdersModel {
  orders: OrderItem[];
  address: ShippingAddress;
}

interface AdminModelData {
  id: string;
  name: string;
  created: string;
  updated: string;
  is_active: boolean;
}

export interface AdminSize {
  id: string;
  name: string;
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
export type AdminCategory = AdminModelData;
