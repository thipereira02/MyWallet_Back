import bcrypt from "bcrypt";

import * as service from "../services/service.js";

export async function signup(req, res){
    try{
        const { name, email, password, confirmPassword } = req.body;
        
        const bodyIsValid = await service.bodyIsValid(name, email, password, confirmPassword);
        if (!bodyIsValid) return res.sendStatus(400);
        
        const emailExists = await service.emailExists(email);
        if (emailExists) return res.sendStatus(409);
        
		const hash = bcrypt.hashSync(password, 12);

        await service.newUser(name, email, hash);
		
        return res.sendStatus(201);

    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}