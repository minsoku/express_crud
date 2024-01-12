const User = require('../model/user.js');
const {errorCodes} = require("../utils/errorCodes");
const bcrypt = require('bcrypt');
const config = require('../config/config');

exports.createUser = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: errorCodes["EMPTY_BODY"]
        });
        return false;
    }

    const hash = await bcrypt.hash(
        req.body.password,
        parseInt(config.HASH_ROUNDS)
    )

    const user = new User({
        email: req.body.email,
        nickname: req.body.nickname,
        password: hash
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

exports.checkDuplicate = (req, res) => {
    const { email, nickname } = req.query;
    let value, type;

    if (email) {
        value = email;
        type = "email";
    } else if (nickname) {
        value = nickname;
        type = "nickname";
    } else {
        return res.status(400).json({ error: errorCodes["NO_EMAIL_NO_NICKNAME"]});
    }
    User.emailDuplicateCheck(type, value, (err, data) => {
        if (err) {
            if (errorCodes[err.kind]) {
                console.log(err.kind);
                res.status(400).send({
                    message: errorCodes[err.kind]
                });
            } else {
                res.status(500).send({
                    message: errorCodes["INTERNAL_ERROR"]
                });
            }
        } else {
            res.send(data);
        }
    })
}