const Joi=require("joi");

const signupValidation=(req,res,next)=>{
    const schema=Joi.object({
        name : Joi.string().min(3).max(100).required(),
        email : Joi.string().email().required(),
        password: Joi.string()
        .min(8)
        .max(100)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.])[A-Za-z\d@$!%*?&.]+$/)


        .required()
        .messages({
            'string.pattern.base': 'Password must have at least 1 letter, 1 number, and 1 special character',
            'string.min': 'Password must be at least 8 characters long',
            'string.max': 'Password must not exceed 100 characters'
        })

    });

    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error});
    }
    next();
}
 
const loginValidation=(req,res,next)=>{
    const schema=Joi.object({
        email : Joi.string().email().required(),
        password : Joi.string().min(4).max(100).required()
    });

    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bad request",error});
    }
    next();
}

module.exports={
    signupValidation,
    loginValidation
}