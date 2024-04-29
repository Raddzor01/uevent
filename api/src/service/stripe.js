import Stripe from "stripe";
import { subscribeToEvent } from './eventSubscription.js';

const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY, {apiVersion: process.env.STRIPE_API_VERSION});

const stripeWebhook = async(req, res) => {
	const signature = req.headers['stripe-signature'];
	let event;

	try {
		event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_KEY);
	} catch (err) {
		throw new Error(`Stripe webhook error: ${err}`);
	}

	if (event.type === 'payment_intent.succeeded') {
	    const { eventId, userId, isVisible } = event.data.object.metadata;
		await subscribeToEvent(eventId, userId, isVisible);
	    console.info('Your payment was successful');
	}

	if (event.type === 'account.updated') {
		if (!event.account)
			return res.sendStatus(500);

		const account = await stripe.accounts.retrieve(event.account);
		if (!account.details_submitted) {
			console.error('Not all account information has been completed yet.');
			return res.sendStatus(500);
		}
	}

  res.sendStatus(200);
};

export default stripe;
export {stripeWebhook};