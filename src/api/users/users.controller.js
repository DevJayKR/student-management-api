const UsersService = require("./users.service");
const Service = new UsersService();
const response = require("../common/response");
const { NotFoundError, InternalServerError } = require("../common/errors/customError");
const { CREATED, OK } = require("../common/errors/httpStatusCode");

module.exports = {
	getUsers: async (req,res,next) => {
		try {
			const data = await Service.getUsers();
			if(data.length===0) throw new NotFoundError("유저 정보가 존재하지 않습니다.");
			if(data.name==="Error")throw new InternalServerError("Mysql Error",data);
			return res.status(OK).send(response.success("모든 유저 찾기 성공",data,OK));
		} catch (error) {
			next(error);
		}
	},

	generateAdmin: async (req,res,next) => {
		try {
			const {email,password,school_id} = req.body;
			const data = await Service.generateAdmin({ email, password,school_id });
			if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(CREATED).send(response.successCreate("어드민 회원가입 성공",CREATED ));
		} catch (error) {
			next(error);
		}
	},

	createUser: async (req,res,next) => {
		try {
			const {email,password} = req.body;
			const data = await Service.createUser({ email, password });
			if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(CREATED).send(response.successCreate("회원가입 성공",CREATED));
		} catch (error) {
			next(error)
		}
	},

	getUserByEmail: async (req,res,next) => {
		try {
			const data = await Service.getUserByEmail({ email });
			if(data.length===0) throw new NotFoundError("존재하지 않는 유저입니다.");
			if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(OK).send(response.success("유저 찾기 성공",data,OK));
		} catch (error) {
			next(error);
		}
	},

	getUserById: async (req,res,next) => {
		try {
			const {id} = req.query;
			const data = await Service.getUserById({id});
			if(data.length ===0) throw new NotFoundError("존재하지 않는 유저입니다.");
			if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(OK).send(response.success("유저 찾기 성공",user,OK));
		} catch (error) {
			next(error);
		}
	},

	getTeachers : async(req,res,next) =>{
		try {
			const data = await Service.getTeachers();
			if(data.length===0) throw new NotFoundError("존재하지 않는 유저입니다.");
			if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(OK).send(response.success("선생님 찾기 성공",data,OK));
		} catch (error) {
			next(error);
		}
	},

	getStudents : async(req,res,next) =>{
		try {
			const data = await Service.getStudents();
			if(data.length===0) throw new NotFoundError("존재하지 않는 유저입니다.");
			if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(OK).send(response.success("학생 찾기 성공",data,OK));	
		} catch (error) {
			next(error);
		}
	},

	createTeacher : async(req,res,next) =>{
		try {
			const {email,password,email_address,name,grade,subject,gender,phone_nubmer,school_id,user_about} = req.body;
			const profile_image_url = req.file.path;
			const data = await Service.createTeacher({email,password,email_address,name,grade,subject,gender,phone_nubmer,school_id});
			if(data.name ==="Error") throw new InternalServerError("Mysql Error",data);
			const teacher = await Service.getUserByEmail({email});
			if(teacher.length===0) throw new NotFoundError("존재하지 않는 유저입니다.");
			const user_id = teacher.id;
			const profile_data = await Service.createProfile({user_id,profile_image_url,user_about});
			if(profile_data.name==="Error") throw new InternalServerError("Mysql Error",profile_data);
			return res.status(CREATED).send(response.successCreate("선생님 등록 성공",CREATED));
		} catch (error) {
			next(error);
		}
	},

	createStudent : async(req,res,next) =>{
		try {
			const {email,password,email_address,name,grade,gender,phone_nubmer,school_id,user_about} = req.body;
			const profile_image_url = req.file.path;
			const data = await Service.createStudent({email,password,email_address,name,grade,gender,phone_nubmer,school_id});
			if(data.name ==="Error") throw new InternalServerError("Mysql Error",data);
			const student = await Service.getUserByEmail({email});
			if(student.length===0) throw new NotFoundError("존재하지 않는 유저입니다.");
			const user_id = student.id;
			const profile_data = await Service.createProfile({user_id,profile_image_url,user_about});
			if(profile_data.name ==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(CREATED).send(response.successCreate("학생 등록 성공",CREATED));
		} catch (error) {
			return next(error);
		}
	},

	// createProfile : async({user_id,profile_image_url,user_about}) =>{
	// 	const profile = await Service.createProfile({user_id,profile_image_url,user_about});
	// 	return response.success("프로필 등록 성공",profile);
	// },

	updateTeacher : async(req,res,next) =>{
		try {
			const {id} = req.query;
			const {subject,grade,gender,email,user_about} = req.body;
			const data = await Service.updateTeacher({subject,grade,gender,email,user_about,id});
			if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(CREATED).send(response.successCreate("선생님 업데이트 성공",CREATED));
		} catch (error) {
			next(error);
		}
	},

	updateStudent : async(req,res,next)=>{
		try {
			const {id} = req.query;
			const {grade,gender,email,user_about} = req.body;
			const data = await Service.updateStudent({grade,gender,email,user_about,id});
			if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
			return res.status(CREATED).send(response.successCreate("학생 업데이트 성공",CREATED));
		} catch (error) {
			next(error);
		}
	},

	deleteUser : async(req,res,next) =>{
		try {
			const {id} = req.query;
			const profile_data = await Service.deleteProfile({id});
			const user_data = await Service.deleteUser({id});
			if(profile_data==="Error"||user_data ==="Error") throw new InternalServerError("Mysql Error",profile_data||user_data);
			return res.status(CREATED).send(response.successCreate("유저 삭제 성공",CREATED));
		} catch (error) {
			next(error);
		}
	},
};
