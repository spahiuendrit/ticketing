import Stripe from "stripe";

if (!process.env.STRIPE_KEY) {
  throw new Error("You should provide stripe secret key");
}

export const stripe = new Stripe(process.env.STRIPE_KEY, {
  apiVersion: "2020-08-27",
});
