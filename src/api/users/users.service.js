const model = require("./users.model");
const bcrpyt = require("bcrypt");
const { BadRequestError, NotFoundError } = require("../common/errors/customError");

module.exports = class UsersService {
	async generateAdmin({ email, password }) {
		const isExist = await this.getUserByEmail({ email });

		if (isExist) throw new BadRequestError("이미 사용중인 이메일입니다.", { email });

		const hashedPassword = await bcrpyt.hash(password, 10);
		await model.generateAdmin({ email, hashedPassword });
		const newAdmin = await model.getUserByEmail({ email });
		newAdmin.password = undefined;

		return newAdmin;
	}

	async createUser({ email, password }) {
		const isExist = await this.getUserByEmail({ email });

		if (isExist) throw new BadRequestError("이미 사용중인 이메일입니다.", { email });

		const hashedPassword = await bcrpyt.hash(password, 10);
		await model.createUser({ email, hashedPassword });
		return await this.getUserByEmail({ email });
	}

	async getUserByEmail({ email }) {
		return await model.getUserByEmail({ email });
	}

	async getUserById({ id }) {
		return await model.getUserById({ id });
	}

	async getUsers() {
		return await model.getUsers();
	}

	async createTeacher({email,password,name,grade,subject,gender,phone_nubmer,school_id}) {
		try {
			const hashedPassword = await bcrpyt.hash(password,10);
			await model.createTeacher({email,hashedPassword,name,grade,subject,gender,phone_nubmer,school_id});
			const teacher = await this.getUserByEmail({email});
			return teacher;	
		} catch (error) {
			console.log(error);
			throw new Error("Error while creating teacher");
		}
	}

	async createStudent({email,password,name,grade,gender,phone_nubmer,school_id}) {
		try {
			const hashedPassword = await bcrpyt.hash(password,10);
			await model.createStudent({email,hashedPassword,name,grade,gender,phone_nubmer,school_id});
			const student = await this.getUserByEmail({email});
			return student;	
		} catch (error) {
			console.log(error);
			throw new Error("Error while creating student");
		}
	}

	async createProfile({user_id,profile_image_url,user_about}){
		await model.createProfile({user_id,profile_image_url,user_about});
		return await model.getProfiles();
		
	}
};
