// Conexão com o MySQL. Os dados vêm do arquivo .env
import mysql from "mysql2/promise";

export const banco = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});
