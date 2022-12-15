const db = require("../../database/models");

const getProductsByCategory = async (req, res) => {
  const categoriesResponse = await db.Category.findAll();

  const categories = categoriesResponse.map((category) => {
    return category.dataValues;
  });

  const searchedCategoryId = categories.filter(
    (category) => category.category === req.params.category
  )[0].id;

  const productsResponse = await db.Product.findAll();

  const products = productsResponse.map((product) => {
    return product.dataValues;
  });

  const categoryProducts = products.filter(
    (product) => product.category_id === searchedCategoryId
  );

  if (categoryProducts !== []) {
    return res.status(201).json({ category: categoryProducts });
  } else {
    return res.status(201).json({ message: "No existen productos para dicha categoría" });
  }
};

module.exports = { getProductsByCategory };
