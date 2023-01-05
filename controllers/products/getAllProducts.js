const db = require("../../database/models");

const getAllProducts = async (req, res) => {
  const categoriesResponse = await db.Category.findAll();

  const categories = categoriesResponse.map((category) => {
    return category.dataValues;
  });

  const productsResponse = await db.Product.findAll();

  const products = productsResponse.map((product) => {
    return product.dataValues;
  });

  return res.status(201).json({
    products: products,
    totalProducts: products.length,
    categories: categories,
    productsByCategories: {
      mates:
        " " + products.filter((product) => product.category_id == 1).length,
      materas:
        " " + products.filter((product) => product.category_id == 2).length,
      bombillas:
        " " + products.filter((product) => product.category_id == 3).length,
      termos:
        " " + products.filter((product) => product.category_id == 4).length,
    },
  });
};

module.exports = { getAllProducts };
