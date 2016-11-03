import Sequelize from 'sequelize';
import config from '../../config.json';

export const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, 
    dialect: 'mysql'
    } 
);


/*
    port: process.env.DB_PORT,
    user: config.db.DB_USERNAME,
    password: config.db.DB_PASSWORD,
    database: config.db.DB_DATABASE,
    host: process.env.DB_HOST,
*/