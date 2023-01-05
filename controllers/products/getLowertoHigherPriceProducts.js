const db = require("../../database/models");

const getLowertoHigherPriceProducts = async (req, res) => {
  const productsResponse = await db.Product.findAll();

  const products = productsResponse.map((product) => {
    return product.dataValues;
  });

  const orderedProducts = products.sort((a, b) => {
    return a.price - b.price;
  });

  return res.status(201).json({ products: orderedProducts });
};

module.exports = { getLowertoHigherPriceProducts };
