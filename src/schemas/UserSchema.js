import joi from "joi";

const userSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().trim().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref("password")).required()
});

export {userSchema};