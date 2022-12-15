const db = require("../../database/models");

const getUserById = (req,res) => {
    db.User.findByPk(req.params.id)
    .then((user) => {
      if (user == undefined) {
        return res.send("cargando");
      } else {
        return res.json({
          id: user.id,
          type: user.type_id,
          username: user.username,
          email: user.email,
        });
      }
    })
    .catch((errors) => console.log(errors));
}

module.exports = {getUserById}