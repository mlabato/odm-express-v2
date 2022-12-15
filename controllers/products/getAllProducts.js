const db = require("../../database/models");

const getAllProducts = (req,res) => {
  db.Product.findAll()
    .then((products) => {
      
      let apiProducts = products.map((product) => {
        return {
          id: product.id,
          category: product.category_id,
          price: product.price,
          model: product.model,
          description: product.description,
          discount: product.discount,
          stock: product.stock,
          image: "http://localhost:3000/images/productImages/" + product.image,
          virola: product.virola_id,
          color: product.color_id,
          material: product.material_id,
          detail: "/products/" + product.id,
        };
      });
      res.json({
        totalProducts: products.length,
        categories: {
          mates:
            " " + products.filter((product) => product.category_id == 1).length,
          materas:
            " " + products.filter((product) => product.category_id == 2).length,
          bombillas:
            " " + products.filter((product) => product.category_id == 3).length,
          termos:
            " " + products.filter((product) => product.category_id == 4).length,
        },
        products: apiProducts,
      });
    })
    .catch((errors) => console.log(errors));
};

module.exports = { getAllProducts };
