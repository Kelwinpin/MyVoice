import 'dotenv/config';
const config = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '123456',
    database: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'postgres',
    dialectOptions: {
        timezone: 'Z',
    },
};
module.exports = config;
