import "../setup.js";
import connection from "../database.js";

export async function userExists(email){
	const userExists = await connection.query(`
        SELECT *
        FROM users
        WHERE email=$1
    `,[email]);
	if (userExists.rowCount !== 0) return userExists.rows[0];
	return false;
}

export async function newUser(name, email, hash) {
	const newUser = await connection.query(`
        INSERT INTO users 
        (name, email, password) 
        VALUES ($1, $2, $3)
    `,[name, email, hash]);
	if (newUser.rowCount === 1) return true;
	return false;
}

export async function newSession(userId, token){
	const createdSession = await connection.query(`
        INSERT INTO sessions
        ("userId", token)
        VALUES ($1, $2)
    `,[userId, token]);
	if (createdSession.rowCount === 1) return true;
	return false;
}

export async function userData(token) {
	const userData = await connection.query(`
        SELECT token, name FROM sessions
        JOIN users
        ON sessions."userId" = users.id
        WHERE sessions.token = $1
    `,[token]);
	return userData.rows[0];
}

export async function finishSession(token) {
	const deleteSession = await connection.query(`
        DELETE FROM sessions
        WHERE token=$1
    `,[token]);
	if (deleteSession.rowCount === 1) return true;
	return false;
}