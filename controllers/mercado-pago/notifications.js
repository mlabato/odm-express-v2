

const notifications = (req,res) => {
    console.log(req.query);
    return res.status(201).json({ msg: "La notificación ha sido realizada" });
}

module.exports = {notifications}