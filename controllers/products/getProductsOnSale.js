const db = require("../../database/models");

const getProductsOnSale = (req,res) =>{
    db.Product.findAll()
    .then((products) => {
      let onSale = products.filter((product) => product.discount > 0.01);
      res.json({ onSale: onSale });
    })
    .catch((errors) => console.log(errors));
}

module.exports = {getProductsOnSale}