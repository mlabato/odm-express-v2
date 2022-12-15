const db = require("../../database/models");

const getAllUsers = (req,res) => {
    db.User.findAll()
      .then((users) => {
        res.json({
          users,
        });
      })
      .catch((errors) => console.log(errors));
}

module.exports = {getAllUsers}