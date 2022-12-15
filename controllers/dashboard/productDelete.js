const db = require("../../database/models");

const productDelete = (req, res) => {
    db.Product.destroy({
        where: { id: req.body.id },
      })
        .then((dbResponse) => {
          return res.status(201).json({
          
            data: dbResponse.dataValues,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
}

module.exports = {productDelete}