const pool = require("../common/db");

module.exports = {
	getUsers: async () => {
		const sql = `SELECT id, email, role_id, school_id FROM users`;
		const result = await pool.execute(sql);

		return result[0];
	},

	generateAdmin: async ({ email, hashedPassword }) => {
		const params = [email, hashedPassword, 5];
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
	
	createTeacher : async({email,hashedPassword,email_address,name,grade,subject,gender,phone_nubmer,school_id})=>{
		const sql = 'INSERT INTO users (email,password,role_id,email_address,name,class,subject,gender,phone_number,school_id)VALUES(?,?,?,?,?,?,?,?,?,?)';
		const params = [email,hashedPassword,3,email_address,name,grade,subject,gender,phone_nubmer,school_id];
		const result = await pool.execute(sql,params);
		return result[0];
	},
	
	createStudent : async({email,hashedPassword,email_address,name,grade,gender,phone_nubmer,school_id})=>{
		const sql = 'INSERT INTO users (email,password,role_id,email_address,name,class,gender,phone_number,school_id)VALUES(?,?,?,?,?,?,?,?,?)';
		const params = [email,hashedPassword,2,email_address,name,grade,gender,phone_nubmer,school_id];
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
	},
	//figma 선생님 리스트
	getTeachers : async() =>{
		const sql= 'SELECT id,name,subject,class,email_address,gender,phone_nubmer,email_address FROM users where role_id = 3';
		const result = await pool.execute(sql);
		return result[0];
	},
	//figma 학생 리스트
	getStudents : async() =>{
		const sql = 'SELECT id,name,email,email_address,class,gender,phone_nubmer,email_address FROM users where role_id = 2';
		const result = await pool.execute(sql);
		return result[0];
	},

	deleteUsers : async({id}) =>{
		const sql = 'DELETE FROM users where id=?';
		const params = [id];
		const result = await pool.execute(sql);
		return result[0];
	},

	updateTeachers : async({subject,grade,gender,email,user_about,id}) =>{
		const sql = 'UPDATE users,profiles set users.subject = ?,users.class=?,users.gender=?,users.email=?,profiles.user_about= ? where users.id =?';
		const params = [subject,grade,gender,email,user_about,id];
		const result = await pool.execute(sql,params);
		return result[0];
	},

	updateStudents : async({grade,gender,email,user_about,id}) =>{
		const sql = 'UPDATE users,profiles set users.class=?,users.gender=?,users.email=?,profiles.user_about= ? where users.id =?';
		const params = [grade,gender,email,user_about,id];
		const result = await pool.execute(sql,params);
		return result[0];
	}
};
