import Joi from "joi";


export const userSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    location: Joi.string().required(),
    interests: Joi.string().valid("Sci-fi","Classic","Romantic","Fiction").required(),
    Age: Joi.number().integer().min(10).max(100).required(),
})