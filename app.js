const express = require('express');
const userRouter = require('./routes/user');
const app = express();
app.set('port', process.env.PORT || 3001)

app.use(express.json());
app.use('/user', userRouter);

module.exports = app;
