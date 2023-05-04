const pool = require("../loaders/db");
const bcrpyt = require("bcrypt");
const response = require("../common/response");

module.exports = {
	getUsers: async () => {
		const sql = `SELECT id, email, role_id, school_id FROM users`;
		const result = await pool.execute(sql);

		return result[0];
	},

	generateAdmin: async ({ email, password }) => {
		const hashedPassword = await bcrpyt.hash(password, 10);
		const params = [email, hashedPassword, 5];
		const sql = `INSERT INTO users(email, password, role_id) VALUES(?,?,?)`;

		await pool.execute(sql, params);
	},

	createUser: async ({ email, password }) => {
		const hashedPassword = await bcrpyt.hash(password, 10);
		const params = [email, hashedPassword];
		const sql = `INSERT INTO users(email, password) VALUES(?,?)`;

		await pool.execute(sql, params);
	},

	getUserByEmail: async ({ email }) => {
		const sql = `SELECT * FROM users where email = ?`;
		const params = [email];

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
