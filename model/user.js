const bcrypt = require("bcrypt");
const sql = require('./db');


const User = function(user) {
    this.email = user.email;
    this.nickname = user.nickname;
    this.password = user.password;
}

User.create = async (newUser) => {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
            if(err) {
                console.log("CREATE_ERROR", err)
                reject({kind: "CREATE_ERROR"});
                return;
            }
            resolve(true);
        })
    })
}

User.duplicateCheck = (type, value) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM user WHERE ?? = ?;", [type, value], (err, res) => {
            if (err) {
                console.log("EMAIL_DUPLICATE_CHECK", err);
                reject(err);
                return;
            }
            if (res.length) {
                reject({ kind: "DUPLICATE_EMAIL" });
                return;
            }
            resolve(true);
        });
    });
}

User.login = (email, password) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT password FROM user WHERE email = ?;", [email], (err, res) => {
            if (err) {
                console.log("LOGIN_ERROR", err);
                reject(err);
                return;
            }
            if (!res.length) {
                reject({ kind: "LOGIN_ERROR" });
                return;
            }
            const user = res[0];

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                if (result) {
                    resolve(true);
                } else {
                    reject({ kind: "LOGIN_ERROR_PASSWORD" });
                }
            })
        })
    });
}

module.exports = User;