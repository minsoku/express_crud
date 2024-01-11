const sql = require('./db');

const User = function(user) {
    this.email = user.email;
    this.nickname = user.nickname;
    this.password = user.password;
}

User.create = (newUser, result) => {
    sql.query(`INSERT INTO user (email, nickname, password) VALUES (${newUser.email}, ${newUser.nickname}, ${newUser.password})`, (err, rows) => {
    // sql.query("INSERT INTO user SET ?", newUser, (err, rows) => {
        if(err) throw err;
        console.log(rows);
    })
    console.log("유저 생성 : ", { ...newUser })
    result(null, {...newUser});
}

module.exports = User;