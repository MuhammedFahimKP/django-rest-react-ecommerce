import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import axios from "axios";

function Razorpay() {

//Function to load razorpay script for the display of razorpay payment SDK.
  function loadRazorpayScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

//function will get called when clicked on the pay button.
async function displayRazorpayPaymentSdk() {
  const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js"
  );

  console.log(res)

  if (!res) {
      alert("Razorpay SDK failed to load. please check are you online?");
      return;
  }

  // creating a new order and sending order ID to backend
  const result = await axios.post("http://127.0.0.1:8000/orders/razorpay/create/", {
      "amount":100.0,
      "currency":"INR"
  });

  console.log(result);

  if (!result) {
      alert("Server error. please check are you onlin?");
      return;
  }

  // Getting the order details back
   const {merchantId=null , amount=null,currency=null,orderId=null } = result.data;

  const options = {
      key: merchantId,
      amount: amount.toString(),
      currency: currency,
      name: "Razorpay Testing",
      description: "Test Transaction",
      order_id: orderId,
      callback_url: "http://127.0.0.1:8000/razorpay_callback",
      redirect: true,
      prefill: {
        name: "Swapnil Pawar",
        email: "swapnil@example.com",
        contact: "9999999999",
    },
      notes: {
          address: "None",
      },
      theme: {
          color: "#61dafb",
      },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}

    return (
        <div className="flex bg-lime-400 w-full">
            <header className="App-header">
                {/* <img  className="App-logo" alt="logo" /> */}
                <p>Razorpay Payments ! Try it Once </p>
                <button className="App-link" onClick={displayRazorpayPaymentSdk}>
                    Pay Now To Test
                </button>
            </header>

            <h1>{}</h1>
        </div>
    );
}

export default Razorpay;