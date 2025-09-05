const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
	host: process.env.DB_HOST || 'localhost',
	port: Number(process.env.DB_PORT || 3306),
	user: process.env.DB_USER || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_NAME || 'test',
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

async function getConnection() {
	return pool.getConnection();
}

async function query(sql, params) {
	const [rows] = await pool.execute(sql, params);
	return rows;
}

module.exports = {
	pool,
	getConnection,
	query,
};


