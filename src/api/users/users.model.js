const pool = require("../common/db");
const bcrpyt = require("bcrypt");
const response = require("../common/response");

module.exports = {
	getUsers: async () => {
		const sql = `SELECT id, email, role_id, school_id FROM users`;
		const result = await pool.execute(sql);

		return result[0];
	},

	generateAdmin: async ({ email, password }) => {
		const params = [email, password, 5];
		const sql = `INSERT INTO users(email, password, role_id) VALUES(?,?,?)`;
		const result = await pool.execute(sql, params);
		
		return result[0];
	},

	createUser: async ({ email, password }) => {
		const params = [email, password];
		const sql = `INSERT INTO users(email, password) VALUES(?,?)`;

		const result = await pool.execute(sql, params);
		return result[0];
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
