import Sequelize from 'sequelize';
//import config from '../../config.json';
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
/*
 'ragnaar',
  DB_PASSWORD: 'GzwfSLZI',
  DB_HOST: 'mysql.stud.iie.ntnu.no',
  DB_PORT: '3306',
  JWT_SECRET: 'wowsuchdogejwtsecret',
  SESSION_SECRET: 'omfgthisissoooosecretlool' }

  
export const sequelize = new Sequelize(
    'ragnaar',
    'ragnaar',
    'GzwfSLZI', {
    host: 'mysql.stud.iie.ntnu.no',
    dialect: 'mysql'
    } 
);

*//*
(function asd(){
    console.log(
        process.env.DB_DATABASE,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,    
        {host: process.env.DB_HOST}
    )
})()

export const sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST

    }
)*/

