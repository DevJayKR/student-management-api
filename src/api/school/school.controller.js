const { NotFoundError, InternalServerError } = require("../common/errors/customError");
const { OK, CREATED } = require("../common/errors/httpStatusCode");
const { success, successCreate, fail } = require("../common/response");
const SchoolService = require("./school.service");
const Service = new SchoolService();

module.exports = {

    findAllSchool : async(req,res,next) =>{
        try {
            const data = await Service.findAllSchool();
            if(data.length===0) throw new NotFoundError("Schools were not found");
            if(data.name === "Error") throw new InternalServerError("Mysql Error",data);
            return res.send(success("Success to find all schools",data,OK));
        } catch (error) {
            return next(error);
        }
    },

    findOneSchool : async(req,res,next) =>{
        try {
            const {school_id} = req.query;
            const data = await Service.findOneSchool({school_id});
            if(data.length===0) throw new NotFoundError("School was not found");
            if(data.name==="Error") throw new InternalServerError("Mysql Error",data);
            return res.send(success("Success to find school",data,OK));
        } catch (error) {
            return next(error);
        }
    },

    createSchool : async(req,res,next) =>{
        try {
            const {school_name,school_email} = req.body;
            const data = await Service.createSchool({school_name,school_email});
            if(data.name ==="Error") throw new InternalServerError("Mysql Error",data);
            return res.send(successCreate("Success to create school",CREATED));
        } catch (error) {
            return next(error);
        }
    },

   deleteSchool : async (req,res,next) => {
       try {
            const data = await Service.deleteSchool(school_id);
            if(data.name ==="Error") throw new InternalServerError("Mysql Error",data);
            return res.send(successCreate("Success to delete school",CREATED));
       } catch (error) {
            return next(error);
       }
   }
}