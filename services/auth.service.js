const dbPromise =  require("../config/database");

const findUserByEmail = async (email) => {
    const db = await dbPromise;

    const [result] = await db.query(
        "SELECT * FROM users WHERE email = ?",
        [email]
    );

    return result
}

const createUser = async (name,email,passwordHash) => {
    const db = await dbPromise;

    const [results] = await db.query(
        "INSERT INTO users (name,email,password) VALUES (?, ?, ?)",
        [name,email,passwordHash]
    )
    return results;
}

module.exports ={findUserByEmail, createUser}