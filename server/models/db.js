import Sequelize from 'sequelize';
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

export const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
    host: 'mysql.stud.iie.ntnu.no',
    port: process.env.DB_PORT,
    dialect: 'mysql'
    } 
);
