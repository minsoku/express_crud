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

User.emailDuplicateCheck = (type, value , result) => {
    sql.query(`SELECT * FROM user WHERE ${type} = "${value}";`, (err, res) => {
        if (err) {
            console.log("EMAIL_DUPLICATE_CHECK", err);
            result(err, null);
            return false;
        }

        if (res.length) {
            result({ kind: "DUPLICATE_EMAIL" }, null)
            return false;
        }
        result(null, true)
    })
}

module.exports = User;