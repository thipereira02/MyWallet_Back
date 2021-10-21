import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";

import { signInSchema, signUpSchema } from "../schemas/UserSchema.js";

import * as repository from"../repositories/userRepository.js";

export async function signUpDataIsValid(name, email, password, confirmPassword){
    const isValid = signUpSchema.validate({name, email, password, confirmPassword});
	if (isValid.error !== undefined) return false
    return true
}

export async function userExists(email){
    const userExists = await repository.userExists(email);
    if (userExists===false) return false
    return [userExists]
}

export async function newUser(name, email, hash){
    const newUser = await repository.newUser(name, email, hash);
    return true
}

export async function signInDataIsValid(email, password){
    const isValid = signInSchema.validate({email, password});
    if (isValid.error !== undefined) return false
    return true
}

export async function generateToken(password, userPassword){
    if (bcrypt.compareSync(password, userPassword)){
        const token = uuidv4();
        return token;
    }
    return false;
}

export async function newSession(userId, token){
    const newSession = await repository.newSession(userId, token);
    return true
}
