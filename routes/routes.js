module.exports = app => {
    const router = require('express').Router();
    const user = require('../controller/user');
    console.log('routes')
    router.post('/user', user.createUser);

    app.use('/', router);
}