import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function PaymentForm() {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "white",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "white" },
        "::placeholder": { color: "white" },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "black",
      },
    },
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      // Send the payment method ID to your server to complete the payment
      console.log("Payment method:", paymentMethod);
    } else {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement options={CARD_OPTIONS} />
        <button disabled={!stripe || loading}>Pay</button>
      </form>
    </>
  );
}
