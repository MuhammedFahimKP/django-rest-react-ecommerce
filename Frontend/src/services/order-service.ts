import apiClient, { ApiClientError, ApiClientResponse } from "./api-client";
import { getState, dispatch } from "../store";

import type { RazorPayResponse } from "../@types";

import { checkout, removeOrderid } from "../slices/checkoutSlice";

class OrderService {
  private orderEndpoint = "orders/";

  createOrder(paymentHandler: (amount: number) => any) {
    let data = {};
    let error: null | ApiClientError = null;

    const { address_id, payment_type } = getState().checkoutSlice.order;

    apiClient
      .post(this.orderEndpoint, {
        shipping_address: address_id,
        payment_type: payment_type,
      })

      .then((res: ApiClientResponse) => {
        data = res.data;

        if (res.status === 201) {
          dispatch(
            checkout({
              order_id: res.data?.order_id,
              payment_id: res.data?.razorpay?.id,
            })
          );

          payment_type === "RAZOR PAY" && paymentHandler(res.data.amount * 100);
        }
      })
      .catch((err) => {
        error = err;
      });

    return { data, error };
  }

  verifyRazorPayOrder(res: RazorPayResponse) {
    let err: null | boolean = null;

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;

    const { order_id } = getState().checkoutSlice.order;

    console.log([razorpay_order_id, razorpay_payment_id, razorpay_signature]);

    apiClient
      .post("orders/razorpay/verify/", {
        payment_order_id: razorpay_order_id,
        order_id: order_id,
        payment_id: razorpay_payment_id,
        signature: razorpay_signature,
      })
      .then(() => {
        err = false;
      })
      .catch(() => {
        err = true;
        this.removeOrder();
      });

    return err;
  }

  removeOrder() {
    const id = getState().checkoutSlice.order.order_id;

    if (id !== "") {
      apiClient
        .delete(this.orderEndpoint + `${id}/`)
        .then((res) => res.status === 204 && dispatch(removeOrderid()));
    }
  }
}

const createOrderService = () => new OrderService();

export default createOrderService;
