import * as service from "../services/userService.js";

export async function signUp(req, res){
    try{
        const { name, email, password, confirmPassword } = req.body;
        
        const bodyIsValid = await service.signUpDataIsValid(name, email, password, confirmPassword);
        if (!bodyIsValid) return res.sendStatus(400);
        
        const userExists = await service.userExists(email);
        if (userExists!==false) return res.sendStatus(409);
        
		const hash = bcrypt.hashSync(password, 12);

        await service.newUser(name, email, hash);
		
        return res.sendStatus(201);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    try {
        const {email, password} = req.body;

        const bodyIsValid = await service.signInDataIsValid(email, password);
        if (!bodyIsValid) return res.sendStatus(400);

        const userExists = await service.userExists(email);
        if (!userExists) return res.sendStatus(401);

        const userId = userExists[0].id;
        const userPassword = userExists[0].password;
        const token = await service.generateToken(password, userPassword);
        if (token===false) return res.sendStatus(401);

        await service.newSession(userId, token);

        res.send(token).status(200);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}