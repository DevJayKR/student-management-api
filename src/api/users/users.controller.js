const UsersService = require("./users.service");
const Service = new UsersService();
const response = require("../common/response");

module.exports = {
	getUsers: async () => {
		return await Service.getUsers();
	},

	generateAdmin: async ({ email, password }) => {
		try {
			const newAdmin = await Service.generateAdmin({ email, password });
			return response.success("어드민 생성 성공", {
				newAdmin,
			});
		} catch (error) {
			if (error.errno === 1062) return response.fail("이미 사용중인 이메일입니다.");
		}
	},

	createUser: async ({ email, password }) => {
		try {
			const newUser = await Service.createUser({ email, password });
			return response.success("회원가입 성공", newUser);
		} catch (error) {
			if (error.errno === 1062) return response.fail("이미 사용중인 이메일입니다.");
		}
	},

	getUserByEmail: async ({ email }) => {
		return await Service.getUserByEmail({ email });
	},

	getUserById: async ({ id }) => {
		return await Service.getUserById({ id });
	},

	createTeacher : async({email,password,grade,subject,gender,phone_nubmer,school_id,profile_image_url,user_about}) =>{
		try {
			const teacher = await Service.createTeacher({email,password,grade,subject,gender,phone_nubmer,school_id});
			const user_id = teacher.id;
			const profile = await Service.createProfile({user_id,profile_image_url,user_about});
			return response.success("선생님 등록 성공",teacher);
		} catch (error) {
			console.log(error);
			if (error.errno === 1062) return response.fail("이미 사용중인 이메일입니다.");
		}
	},

	createStudent : async({email,password,grade,gender,phone_nubmer,school_id,profile_image_url,user_about}) =>{
		try {
			const student = await Service.createStudent({email,password,grade,gender,phone_nubmer,school_id,profile_image_url,user_about});
			const user_id = student.id;
			const profile = await Service.createProfile({user_id,profile_image_url,user_about});
			return response.success("학생 등록 성공",student);

		} catch (error) {
			console.log(error);
			if (error.errno === 1062) return response.fail("이미 사용중인 이메일입니다.");
		}
	},

	createProfile : async({user_id,profile_image_url,user_about}) =>{
		const profile = await Service.createProfile({user_id,profile_image_url,user_about});
		return response.success("프로필 등록 성공",profile);
	}
};
