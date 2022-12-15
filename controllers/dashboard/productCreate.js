const db = require("../../database/models");
const { validationResult } = require("express-validator");

const productCreate = (req,res ) => {
    const result = validationResult(req);
      
    if (result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors })
    }

    db.Product.create({
      ...req.body,
      image: req.file.filename,
    })
      .then((dbResponse) => {
        return res.status(201).json({
          data: dbResponse.dataValues,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
};

module.exports = {productCreate}