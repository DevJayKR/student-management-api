const model = require("./users.model");
const bcrpyt = require("bcrypt");

module.exports = class UsersService {

	async getUserByEmail({ email }) {
		try {
			const user = await model.getUserByEmail({email});
			return user;
		} catch (error) {
			return error;
		}
	}

	async getUserById({ id }) {
		try {
			const user = await model.getUserById({ id });	
			return user;
		} catch (error) {
			return error;
		}
	}

	async getUsers() {
		try {
			const user = await model.getUsers();
			return user;
		} catch (error) {
			return error;
		}
	}

	async generateAdmin({ email, password,school_id }) {
		try {
			const hashedPassword = await bcrpyt.hash(password, 10);
			return await model.generateAdmin({ email, hashedPassword,school_id });
		} catch (error) {
			return error;
		}
	}

	async createUser({ email, password }) {
		try {
			const hashedPassword = await bcrpyt.hash(password, 10);
			return await model.createUser({ email, hashedPassword });
		} catch (error) {
			return error;
		}
	}

	async createTeacher({email,password,email_address,name,grade,subject,gender,phone_nubmer,school_id}) {
		try {
			const hashedPassword = await bcrpyt.hash(password,10);
			return await model.createTeacher({email,hashedPassword,email_address,name,grade,subject,gender,phone_nubmer,school_id});
		} catch (error) {
			return error;
		}
	}

	async createStudent({email,password,email_address,name,grade,gender,phone_nubmer,school_id}) {
		try {
			const hashedPassword = await bcrpyt.hash(password,10);
			return await model.createStudent({email,hashedPassword,email_address,name,grade,gender,phone_nubmer,school_id});
		} catch (error) {
			return error;
		}
	}

	async createProfile({user_id,profile_image_url,user_about}){
		try {
			return await model.createProfile({user_id,profile_image_url,user_about});	
		} catch (error) {
			return error;
		}
	}

	async getTeachers(){
		try {
			return await model.getTeachers();	
		} catch (error) {
			return error;
		}
	}

	async getStudents(){
		try {
			return await model.getStudents();	
		} catch (error) {
			return error;
		}
	}

	async updateTeacher({subject,grade,gender,email,user_about,id}){
		try {
			return await model.updateTeachers({subject,grade,gender,email,user_about,id});
		} catch (error) {
			return error;
		}
	}

	async updateStudent({grade,gender,email,user_about,id}){
		try {
			return await model.updateTeachers({grade,gender,email,user_about,id});	
		} catch (error) {
			return error;
		}
	}

	async deleteUser({id}){
		try {
			return await model.deleteUsers({id});
		} catch (error) {
			return error;
		}
	}

	async deleteProfile({id}){
		try {
			return await model.deleteProfile({id});
		} catch (error) {
			return error;
		}
	}
};
