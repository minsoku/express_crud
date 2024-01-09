const {pool} = require("../db");
exports.getAllUsers = async (req, res) => {
    const client = await pool.connect();
    try {
        const result = await client.query('SELECT name, email FROM tb_user');
        const results = {'results': (result) ? result.rows : null};
        res.send(results.results);
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    } finally {
        client.release();
    }
};