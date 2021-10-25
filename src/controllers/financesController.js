import * as financesService from "../services/financesService.js";

export async function addFinance(req, res) {
    try {
        const { value, description, eventType } = req.body;
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        const bodyIsValid = await financesService.dataIsValid(value, description);
        if (!bodyIsValid) return res.sendStatus(400);

        const userId = await financesService.getUserId(token);
        await financesService.newFinance(userId, value, description, eventType);

        return res.sendStatus(201);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}


export async function getFinances(req, res) {
    try {
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        const userId = await financesService.getUserId(token);
        if (!userId) return res.sendStatus(400);

        const userFinances = await financesService.getUserFinances(userId);
        if(!userFinances) return res.sendStatus(404);
        
        return res.send(userFinances);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}

export async function logout(req, res) {
    try {
        const authorization = req.header("Authorization");
        const token = authorization?.replace("Bearer ", "");

        await financesService.finishSession(token);

        return res.sendStatus(200);
    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
}