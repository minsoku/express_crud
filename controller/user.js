const User = require('../model/user.js');
exports.createUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body가 없음"
        });
    }

    const user = new User({
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password
    })

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "유저를 생성하는데 오류가 생김"
            })
        }
        else res.send(data)
    })
}