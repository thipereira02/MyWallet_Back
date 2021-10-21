import "../setup.js";
import connection from "../database.js";

export async function userExists(email){
    const userExists = await connection.query(`
        SELECT *
        FROM users
        WHERE email=$1
    `,[email]);
    if (userExists.rowCount !== 0) return userExists.rows[0]
    return false
}

export async function newUser(name, email, hash) {
    await connection.query(`
        INSERT INTO users 
        (name, email, password) 
        VALUES ($1, $2, $3)
    `,[name, email, hash]);
}

export async function newSession(userId, token){
    await connection.query(`
        INSERT INTO sessions
        ("userId", token)
        VALUES ($1, $2)
    `,[userId, token]);
}
