const { Pool } = require('pg');
const { development } = require('./config/config')

// PostgreSQL 연결을 설정합니다.
const pool = new Pool(development);

module.exports = {
    pool
};
