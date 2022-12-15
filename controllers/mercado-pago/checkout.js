const mercadopago = require("mercadopago");
const { response } = require("express");

const checkout = async(req, res) => {
    const orderedItems = req.body.items;

    const mappedItems = orderedItems.map((item, i) => ({
      title: item.model,
      unit_price: parseInt(item.price - item.price / item.discount),
      quantity: item.amount,
    }));

    // Crea un objeto de preferencia
    let preference = {
      items: mappedItems,
      notification_url: "https://1e40-190-17-179-107.sa.ngrok.io/notifications", //I USED NGROK TO AVOID MERCADOPAGO HTTP LIMITATIONS
      external_reference: "7658138216608243", //CLIENT_ID
      shipments: {
        cost: 1000,
        mode: "not_specified",
      },
      back_urls: {
        success: "http://localhost:3001/",
        failure: "http://localhost:3001/",
        pending: "http://localhost:3001/",
      },
      auto_return: "approved",
    };

    const mpResponse = await mercadopago.preferences.create(preference);

    return res.status(201).json({ init_point: mpResponse.body.init_point });
}

module.exports = {checkout}