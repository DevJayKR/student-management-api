const { NotFoundError } = require("../common/errors/customError");
const { OK, CREATED } = require("../common/errors/httpStatusCode");
const { success, successCreate, fail } = require("../common/response");
const SchoolService = require("./school.service");
const Service = new SchoolService();

module.exports = {

    findAllSchool : async(req,res,next) =>{
        try {
            const schools = await Service.findAllSchool();
            if(schools.length===0) throw new NotFoundError("Schools were not found");
            return res.send(success("Success to find all schools",schools,OK));
        } catch (error) {
            console.error(error);
            return next(error);
        }
    },

    findOneSchool : async(req,res,next) =>{
        try {
            const {school_id} = req.query;
            //school_id 예외 처리 필요
            const school = await Service.findOneSchool({school_id});
            if(school.length===0) throw new NotFoundError("School was not found");
            return res.send(success("Success to find school",school,OK));
        } catch (error) {
            console.error(error);
            return next(error);
        }
    },

    createSchool : async(req,res,next) =>{
        try {
            const {school_name,school_email} = req.body;
            await Service.createSchool({school_name,school_email});
            return res.send(successCreate("Success to create school",CREATED));
        } catch (error) {
            console.error(error);
            return next(error);
        }
    },

   deleteSchool : async (req,res,next) => {
       try {
            await Service.deleteSchool(school_id);
            return res.send(successCreate("Success to delete school",CREATED));
       } catch (error) {
            console.error(error);
            return next(error);
       }
   }
}