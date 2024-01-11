module.exports = app => {
    const router = require('express').Router();
    const user = require('../controller/user');
    console.log('routes')
    router.post('/user/signup', user.createUser);
    router.post('/user/signup/emailcheck', user.findUserEmail);

    app.use('/', router);
}