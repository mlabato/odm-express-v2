const db = require("../../database/models");
const Op = db.Sequelize.Op;

const getSearchedProducts = (req, res) => {
  db.Product.findAll({
    where: {
      model: { [Op.like]: `%${req.params.query}%` },
    },
  })
    .then((products) => {
      let searchedProducts = products.map((product) => {
        return {
          query: req.params.query,
          id: product.id,
          category: product.category_id,
          price: product.price,
          model: product.model,
          discount: product.discount,
          stock: product.stock,
          image: "http://localhost:3000/images/productImages/" + product.image,
          virola: product.virola_id,
          color: product.color_id,
          material: product.material_id,
          detail: "/products/" + product.id,
        };
      });

      return res.status(201).json({
        data: searchedProducts,
        message: "Successful search",
      });
    })
    .catch((errors) => console.log(errors));
};

module.exports = { getSearchedProducts };
