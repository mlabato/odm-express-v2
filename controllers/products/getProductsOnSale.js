const db = require("../../database/models");

const getProductsOnSale = async (req, res) => {
  const productsResponse = await db.Product.findAll();

  const products = productsResponse.map((product) => {
    return product.dataValues;
  });

  const onSaleProducts = products.filter((product) => product.discount > 0.01);

  if (onSaleProducts !== []) {
    return res.status(201).json({ products: onSaleProducts });
  } else {
    return res
      .status(201)
      .json({ message: "Por el momento no tenemos productos en oferta" });
  }
};

module.exports = { getProductsOnSale };
