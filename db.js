const { Pool } = require('pg');

// PostgreSQL 연결을 설정합니다.
const pool = new Pool({
    user: 'minsoku',
    host: 'localhost',
    database: 'express_crud',
    password: '1234',
    port: 5432,
});

module.exports = {
    pool
};
