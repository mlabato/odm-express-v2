const db = require("../../database/models");
const Op = db.Sequelize.Op;
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");

const userEdit = (req,res) => {
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
          
          if (result.length === 0) {
            db.User.update(
                {
                  id: req.body.id,
                  username: req.body.username,
                  email: req.body.email,
                  password: bcryptjs.hashSync(req.body.password, 10),
                  type_id: 1,
                },
                {
                  where: { id: req.body.id },
                }
              )
              .then(() => {
                return res.status(201).json({
                  msg: "El usuario ha sido editado con éxito",
                });
              })
              .catch((error) => {
                console.log(error);
              });
            
          } else {
            console.log(typeof req.body.id)
            console.log(typeof result[0].dataValues.id)
            if(req.body.id == result[0].dataValues.id ){
              db.User.update(
                {
                  id: req.body.id,
                  username: req.body.username,
                  email: req.body.email,
                  password: bcryptjs.hashSync(req.body.password, 10),
                  type_id: 1,
                },
                {
                  where: { id: req.body.id },
                }
              )
              .then(() => {
                return res.status(201).json({
                  msg: "El usuario ha sido editado con éxito",
                });
              })
              .catch((error) => {
                console.log(error);
              });

            }else{
              return res.status(400).json({
                msg: "el username y/o el email están registrados",
              });
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
}

module.exports = {userEdit}