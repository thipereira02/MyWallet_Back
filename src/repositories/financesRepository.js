import "../setup.js";
import connection from "../database.js";

export async function getUserId(token) {
    const result = await connection.query(`
        SELECT * 
        FROM sessions
        WHERE token=$1
    `,[token]);
    return result.rows[0]
}

export async function newFinance(userId, value, description, eventType) {
    await connection.query(`
        INSERT INTO finances
        ("userId", value, description, "eventType", date)
        VALUES ($1, $2, $3, $4, NOW())
    `,[userId, value, description, eventType]);
}