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

    const {email, password, nickname} = req.body;

    try {
        await User.duplicateCheck("email", email);
    } catch (err) {
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
    }

    try {
        await User.duplicateCheck("nickname", nickname);
    } catch (err) {
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
    }

    const hash = await bcrypt.hash(
        password,
        parseInt(config.HASH_ROUNDS)
    )

    const user = new User({
        email,
        nickname,
        password: hash
    })
    try {
        await User.create(user);
        res.send(true);
    } catch (err) {
        if (errorCodes[err.kind]) {
            console.log(err.kind);
            res.status(400).send({
                message: errorCodes[err.kind]
            })
        } else {
            res.status(500).send({
                message: errorCodes["INTERNAL_ERROR"]
            })
        }
    }

}

exports.checkDuplicate = async (req, res) => {
    const {email, nickname} = req.query;
    let value, type;

    if (email) {
        value = email;
        type = "email";
    } else if (nickname) {
        value = nickname;
        type = "nickname";
    } else {
        return res.status(400).json({error: errorCodes["NO_EMAIL_NO_NICKNAME"]});
    }
    try {
        await User.duplicateCheck(type, value);
        res.send(true);
    } catch (err) {
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
    }
}


exports.loginUser = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: errorCodes["EMPTY_BODY"]
        });
        return false;
    }

    const {email, password} = req.body;

    try {
        await User.login(email, password);
        res.send(true);
    } catch (err) {
        if (errorCodes[err.kind]) {
            res.status(400).send({
                message: errorCodes[err.kind]
            });
        } else {
            res.status(500).send({
                message: errorCodes["INTERNAL_ERROR"]
            });
        }
    }
}