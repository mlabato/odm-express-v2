const db = require("../../database/models");
const { validationResult } = require("express-validator");

const productEdit = (req,res) => {
    const result = validationResult(req);
      
    if (result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors })
    }

      db.Product.update(
        {
          ...req.body,
          image: req.file.filename,
        },
        {
          where: { id: req.body.id },
        }
      )
        .then((dbResponse) => {
          console.log(dbResponse);
          return res.status(201).json({
            data: dbResponse.dataValues,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
};

module.exports = {productEdit}