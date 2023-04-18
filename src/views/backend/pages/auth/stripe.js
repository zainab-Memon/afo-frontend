import React from "react";
import PaymentForm from "./PaymentForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51LlJR2Ecsrsl4o92FcXQEejkALVzZRr10m9fdgPedSMTlX8VEzjjm1CoP5USoiuOtCTNpnDkaNxnvdekzA4OXZUR00o5qKF5Z2"
);
function Stripe() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

export default Stripe;
