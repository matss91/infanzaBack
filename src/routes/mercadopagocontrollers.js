const express = require('express');
const { MercadoPagoConfig, Preference, Payment } = require('mercadopago');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// Configuración del cliente
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

const preference = new Preference(client);
const payment = new Payment(client);

//
// 1. Crear preferencia (Checkout Pro)
//
router.post('/create-preference', async (req, res) => {
  try {
    const { title, price, quantity } = req.body;

    const body = {
      items: [
        {
          title: title || 'Producto',
          quantity: quantity || 1,
          unit_price: price || 1000,
          currency_id: "ARS"
        }
      ],
      back_urls: {
        success: 'https://unglowing-vindictive-linn.ngrok-free.dev/success',
        failure: 'https://unglowing-vindictive-linn.ngrok-free.dev/failure',
        pending: 'https://unglowing-vindictive-linn.ngrok-free.dev/pending',
      },
      auto_return: 'approved',
    };

//console.log("back_urls:", body.back_urls);
    const response = await preference.create({ body });

    res.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando preferencia' });
  }
});

//
// 2. Crear pago directo (tarjeta, etc.)
//
router.post('/create-payment', async (req, res) => {
  try {
    const { token, issuer_id, payment_method_id, transaction_amount, email } = req.body;

    const body = {
      transaction_amount: Number(transaction_amount),
      token,
      issuer_id,
      payment_method_id,
      payer: {
        email,
      },
    };

    const response = await payment.create({ body });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creando pago' });
  }
});

//
// 3. Webhook (notificaciones de Mercado Pago)
//
router.post('/webhook', async (req, res) => {
  try {
    const paymentId = req.body?.data?.id;

    if (paymentId) {
      const result = await payment.get({ id: paymentId });
      console.log('Pago recibido:', result);
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//
// 4. Consultar pago por ID
//
router.get('/payment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await payment.get({ id });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error consultando pago' });
  }
});

module.exports = router;