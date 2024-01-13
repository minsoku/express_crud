const bcrypt = require("bcrypt");
const sql = require('./db');


const User = function(user) {
    this.email = user.email;
    this.nickname = user.nickname;
    this.password = user.password;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO user SET ?", newUser, (err, rows) => {
        if(err) throw err;
        console.log(rows);
    })
    console.log("유저 생성 : ", { ...newUser })
    result(null, {...newUser});
}

User.duplicateCheck = (type, value) => {
    return new Promise((resolve, reject) => {
        sql.query("SELECT * FROM user WHERE ?? = ?;", [type, value], (err, res) => {
            if (err) {
                console.log("EMAIL_DUPLICATE_CHECK", err);
                reject(err);
                return;
            }
            if (!res.length) {
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
            console.log(user)

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