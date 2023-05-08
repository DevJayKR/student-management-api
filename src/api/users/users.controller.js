const UsersService = require("./users.service");
const Service = new UsersService();
const response = require("../common/response");
const { NotFoundError } = require("../common/errors/customError");

module.exports = {
	getUsers: async () => {
		return await Service.getUsers();
	},

	generateAdmin: async ({ email, password }) => {
		const newAdmin = await Service.generateAdmin({ email, password });
		return response.success("어드민 생성 성공", {
			newAdmin,
		});
	},

	createUser: async ({ email, password }) => {
		const newUser = await Service.createUser({ email, password });
		return response.success("회원가입 성공", newUser);
	},

	getUserByEmail: async ({ email }) => {
		const user = await Service.getUserByEmail({ email });

		if (user) return user;
		else throw new NotFoundError("존재하지 않는 유저입니다.");
	},

	getUserById: async ({ id }) => {
		const user = await Service.getUserById({ id });
		if (user) return user;
		else throw new NotFoundError("존재하지 않는 유저입니다.");
	},

	createTeacher : async({email,password,email_address,name,grade,subject,gender,phone_nubmer,school_id,profile_image_url,user_about}) =>{
		try {
			const teacher = await Service.createTeacher({email,password,email_address,name,grade,subject,gender,phone_nubmer,school_id});
			const user_id = teacher.id;
			const profile = await Service.createProfile({user_id,profile_image_url,user_about});
			return response.success("선생님 등록 성공",teacher);
		} catch (error) {
			console.log(error);
			if (error.errno === 1062) return response.fail("이미 사용중인 이메일입니다.");
		}
	},

	createStudent : async({email,password,email_address,name,grade,gender,phone_nubmer,school_id,profile_image_url,user_about}) =>{
		try {
			const student = await Service.createStudent({email,password,email_address,name,grade,gender,phone_nubmer,school_id,profile_image_url,user_about});
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
	},

	getTeachers : async() =>{
		const teachers = await Service.getTeachers();
		return response.success("선생님 찾기 성공",teachers);
	},

	getStudents : async() =>{
		const students = await Service.getStudents();
		return response.success("학생 찾기 성공",students);
	},

	updateTeacher : async({subject,grade,gender,email,user_about,id}) =>{
		const teachers = await Service.updateTeacher({subject,grade,gender,email,user_about,id});
		return response.success("선생님 업데이트 성공",teachers);
	},

	updateStudent : async({grade,gender,email,user_about,id})=>{
		const students = await Service.updateStudent({grade,gender,email,user_about,id});
		return response.success("학생 업데이트 성공",students);
	}
};
