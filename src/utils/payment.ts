import stripe from 'stripe';

const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount, currency) => {
  try {
    const paymentIntent = await stripeClient.paymentIntents.create({
      amount,
      currency,
    });
    return paymentIntent;
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new Error('Payment processing failed');
  }
};
