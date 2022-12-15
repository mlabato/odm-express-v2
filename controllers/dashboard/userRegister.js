const db = require("../../database/models");
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const userRegister = (req, res) => {
  const result = validationResult(req);

  if (result.errors.length > 0) {
    return res.status(400).json({ errors: result.errors });
  }

  //Validaciones username y mail
  db.User.findAll({
    where: {
      [Op.or]: { username: req.body.username, email: req.body.email },
    },
  })
    .then((result) => {
      //En caso de no estar registrado ni el username y el mail
      if (result.length === 0) {
        db.User.create({
          username: req.body.username,
          email: req.body.email,
          password: bcryptjs.hashSync(req.body.password, 10),
          type_id: 1,
        })
          .then(() => {
            return res.status(201).json({
              msg: "El usuario ha sido creado",
            });
          })
          .catch((error) => {
            console.log(error);
          });
        //en caso de estar registrado el username y/o el mail
      } else {
        return res.status(400).json({
          msg: "el username y/o el email están registrados",
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { userRegister };
