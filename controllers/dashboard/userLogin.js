const db = require("../../database/models");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const userLogin = (req,res) => {
    const result = validationResult(req);

    if (result.errors.length > 0) {
      return res.status(400).json({ errors: result.errors });
    }

    db.User.findAll({ where: { email: req.body.email } })
      .then((result) => {
        if (result.length === 0) {
          return res.status(400).json({ error: "el mail no está registrado" });
        } else {
          const passwordValidation = bcryptjs.compareSync(
            req.body.password,
            result[0].dataValues.password
          );
          if (passwordValidation == true) {
            return res
              .status(201)
              .json({ msg: "el usuario ha sido logueado correctamente" });
          } else {
            return res
              .status(400)
              .json({ error: "la contraseña no es correcta" });
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
}

module.exports = {userLogin}