import { getState } from "../store";
import createOrderService from "./order-service";
import Logo from "../assets/blackLogo.svg";

class Payment {
  private scriptLoaded = false;

  private RAZOR_PAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
  private _Logo = Logo;

  private loadScript(src: string) {
    return new Promise<void>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve();
        this.scriptLoaded = true;
      };
      script.onerror = () => {
        reject(new Error(`Script load error for ${src}`));
      };
      document.body.appendChild(script);
    });
  }

  handlePayment = async (amount: number) => {
    const orderServiceInstance = createOrderService();

    await this.loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (this.scriptLoaded === false) {
      return;
    }

    const order_id = getState().checkoutSlice.order.payment_id;

    try {
      const options: RazorpayOptions = {
        key: this.RAZOR_PAY_KEY,
        amount: amount.toString(),
        currency: "INR",
        name: "Wild FAB",
        description: "Checkout Payment",
        image: this._Logo,
        order_id: order_id,
        handler: (res: any) => {
          console.log(res);
          orderServiceInstance.verifyRazorPayOrder(res);
        },

        modal: {
          ondismiss() {
            orderServiceInstance.removeOrder();
          },
        },

        notes: {
          address: "WildFab PVLTD ",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment creation failed:", error);
    }
  };
}

const createPaymentService = () => new Payment();

export default createPaymentService;
