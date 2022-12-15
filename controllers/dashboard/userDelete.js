const db = require("../../database/models");

const userDelete = (req,res) => {
    db.User.destroy({
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

module.exports = {userDelete}