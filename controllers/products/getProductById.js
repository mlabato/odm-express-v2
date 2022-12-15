const db = require("../../database/models");

const getProductById = (req,res) => {
    db.Product.findByPk(req.params.id)
    .then((product) => {
      if (product == undefined) {
        return res.send("cargando");
      } else {
        return res.json({
          id: product.id,
          category: product.category_id,
          price: product.price,
          model: product.model,
          discount: product.discount,
          stock: product.stock,
          image:
            "http://localhost:3000/images/productImages/" + product.image,
          virola: product.virola_id,
          color: product.color_id,
          material: product.material_id,
        });
      }
    })
    .catch((errors) => console.log(errors));
}

module.exports = {getProductById}