import "../setup.js";
import connection from "../database.js";

export async function emailExists(email){
    const result = await connection.query(`
        SELECT * 
        FROM users
        WHERE email=$1
    `,[email]);
    if (result.rowCount !== 0) return true
    else return false
}

export async function newUser(name, email, hash) {
    await connection.query(`
        INSERT INTO users 
        (name, email, password) 
        VALUES ($1, $2, $3)
    `,[name, email, hash]);
}