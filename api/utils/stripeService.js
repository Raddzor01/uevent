import Stripe from "stripe";
import config from "../config.json" assert { type: "json" };

const stripe = new Stripe(config.stripe.api_key, config.stripe.config);

export default stripe;