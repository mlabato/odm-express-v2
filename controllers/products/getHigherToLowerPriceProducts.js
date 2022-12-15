const db = require("../../database/models");

const getHigherToLowerPriceProducts = async (req, res) => {
  const productsResponse = await db.Product.findAll();

  const products = productsResponse.map((product) => {
    return product.dataValues;
  });

  const orderedProducts = products.sort((a, b) => {
    return b.price - a.price;
  });

  return res.status(201).json({ orderedProducts: orderedProducts });
};

module.exports = { getHigherToLowerPriceProducts };
