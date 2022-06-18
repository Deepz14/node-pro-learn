const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.sendStripeKey = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            stripe_key: process.env.STRIPE_API_KEY
        });

    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.stripePayment = async(req, res) => {
    try {
        
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'INR',
            amount: req.body.amount,

            //optional
            metadata: { integration_check: 'accept_a_payment'}
        });

        res.status(200).json({
            success: true,
            amount: req.body.amount,
            client_secret: paymentIntent.client_secret
        })

    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.sendRazorPayKey = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            razorpay_key: process.env.RAZORPAY_API_KEY
        });

    } catch (err) {
        res.status(400).send({error: err.message});
    }
}

exports.razorPayment = async(req, res) => {
    try {
        
        let instance = new Razorpay({ key_id: process.env.RAZORPAY_API_KEY, key_secret: process.env.RAZORPAY_SECRET_KEY});

        let options = {  amount: req.body.amount,  currency: "INR"}

        const myOrder = await instance.orders.create(options);
        
        res.status(200).json({
            success: true,
            amount: req.body.amount,
            order: myOrder
        })
    } catch (err) {
        res.status(400).send({error: err.message});
    }
}
