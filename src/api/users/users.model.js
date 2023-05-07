const pool = require("../common/db");

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
	getTeacher: async({id})=>{
		const sql = 'SELECT * FROM users AS u,profiles AS p where ?=?';
		const params = [id,id];
		const result = await pool.execute(sql,params);
		
		return result[0];

	},
	
	createTeacher : async({email,hashedPassword,name,grade,subject,gender,phone_nubmer,school_id})=>{
		const sql = 'INSERT INTO users (email,password,role_id,name,class,subject,gender,phone_number,school_id)VALUES(?,?,?,?,?,?,?,?)';
		const params = [email,hashedPassword,3,name,grade,subject,gender,phone_nubmer,school_id];
		const result = await pool.execute(sql,params);
		return result[0];
	},
	
	createStudent : async({email,hashedPassword,name,grade,gender,phone_nubmer,school_id})=>{
		const sql = 'INSERT INTO users (email,password,role_id,name,class,gender,phone_number,school_id)VALUES(?,?,?,?,?,?,?)';
		const params = [email,hashedPassword,2,name,grade,gender,phone_nubmer,school_id];
		const result = await pool.execute(sql,params);
		return result[0];
	},

	createProfile : async({user_id,profile_image_url,user_about})=>{
		const sql = 'INSERT INTO profiles (user_id,profile_image_url,user_about)VALUES(?,?,?)';
		const params = [user_id,profile_image_url,user_about];
		
		const result = await pool.execute(sql,params);
		return result[0];
	},

	getProfiles : async()=>{
		const sql = 'SELECT * FROM profiles';
		const result = await pool.execute(sql);
		return result[0];
	},
	
	getProfile : async({id}) => {
		const sql = 'SELECT * FROM profiles where id = ?';
		const params = [id];
		const result = await pool.execute(sql,params);
		return result[0];
	}
};
