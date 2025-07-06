const Joi = require('joi');

// Signup Validation Middleware

const  signupValidation = (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(100).required(),
      email: Joi.string().email().required(),
      year: Joi.string().required(),
      branch: Joi.string().required(),
      college: Joi.string().min(3).max(100).required(),
      password: Joi.string()
        .min(6)
        .max(100)
        .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
        .required(),
      linkedin: Joi.string().uri().required(),
      github: Joi.string().uri().required(),
      about: Joi.string().required(),
      skills: Joi.array().items(Joi.string()).required(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message: "Bad request", error})
    }
    next();
}

// Login Validation Middleware
const  loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(100).required(),
    });

    const {error} = schema.validate(req.body);
    if(error){
        return res.status(400)
            .json({message: "Bad request", error})
    }
    next();
}

module.exports = {
  signupValidation,
  loginValidation
};