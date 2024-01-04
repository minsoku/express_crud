const { pool } = require('./db');

const express = require('express');
const app = express();
app.set('port', process.env.PORT || 3001)


// 라우트를 설정합니다.
app.get('/', async function(req, res, next) {
    const client = await pool.connect();

    try {
        const result = await client.query('SELECT name, email FROM tb_user');
        const results = { 'results': (result) ? result.rows : null };
        res.send(results.results);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    } finally {
        client.release();
    }
});

module.exports = app;

