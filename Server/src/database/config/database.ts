import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Carrega as variáveis do .env
dotenv.config();

const db = new Sequelize(process.env.DB || "", process.env.DB_USER || "", process.env.DB_PASS || "", {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    dialect: 'postgres',
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

export default db;
