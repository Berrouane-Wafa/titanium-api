const mysql = require('mysql2/promise');

async function connectDB() {
    try {
        const db =await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
        })

        console.log("Connecté à MySQL !");
        return db;

    } catch (error) {
        console.error("Erreur de connexion à MySQL :", error);
        throw error;
        

    }
}


//rendre cette connexion disponible pour tous les autres fichiers
module.exports = connectDB();