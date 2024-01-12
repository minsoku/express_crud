module.exports = app => {
    const router = require('express').Router();
    const user = require('../controller/user');
    console.log('routes')
    router.post('/user/signup', user.createUser);
    router.post('/user/duplicate-check', user.checkDuplicate);

    app.use('/', router);
}