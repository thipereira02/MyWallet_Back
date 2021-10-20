import { userSchema } from "../schemas/UserSchema.js";

import * as repository from"../repositories/repository.js";

export async function bodyIsValid(name, email, password, confirmPassword){
    const isValid = userSchema.validate({name, email, password, confirmPassword});
	if (isValid.error !== undefined) return false
    else return true
}

export async function emailExists(email){
    const emailExists = await repository.emailExists(email);
    if (emailExists) return true
    else return false
}

export async function newUser(name, email, hash){
    const newUser = await repository.newUser(name, email, hash);
    return true
}