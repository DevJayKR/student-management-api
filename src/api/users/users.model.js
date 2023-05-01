const pool = require("../loaders/db");
const bcrpyt = require("bcrypt");
const response = require("../common/response");

module.exports = {
	getUsers: async () => {
		const sql = `SELECT id, username, role_id, school_id FROM users`;
		const result = await pool.execute(sql);

		return result[0];
	},

	generateAdmin: async ({ username, password }) => {
		const hashedPassword = await bcrpyt.hash(password, 10);
		const params = [username, hashedPassword, 5];
		const sql = `INSERT INTO users(username, password, role_id) VALUES(?,?,?)`;

		await pool.execute(sql, params);
	},

	createUser: async ({ username, password }) => {
		const hashedPassword = await bcrpyt.hash(password, 10);
		const params = [username, hashedPassword];
		const sql = `INSERT INTO users(username, password) VALUES(?,?)`;

		await pool.execute(sql, params);
	},

	getUserByUsername: async ({ username }) => {
		const sql = `SELECT * FROM users where username = ?`;
		const params = [username];

		const result = await pool.execute(sql, params);
		return result[0][0];
	},

	getUserById: async ({ id }) => {
		const sql = `SELECT * FROM users where id = ?`;
		const params = [id];

		const result = await pool.execute(sql, params);
		return result[0][0];
	},
};
