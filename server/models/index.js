import Sequelize from 'sequelize';
import userModel from '../models/User';
import carModel from '../models/Car';
import orderModel from '../models/Order';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const sequelize = new Sequelize(
    process.env.DB_DATABASE, 
    process.env.DB_USERNAME, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql'
    } 
);


const User = sequelize.define('bk_user', userModel)
const Car = sequelize.define('bk_car', carModel)
const Order = sequelize.define('bk_order', orderModel)


User.hasOne(Order, {foreignKey: 'user_id'});
Car.hasOne(Order, {foreignKey: 'car_id'});
Order.belongsTo(Car);
Order.belongsTo(User);
export { User, Car, Order };

User.sync().catch(err => console.log(err));
Car.sync()
    /*.then(() => Car.create({
        make: 'Skoda',
        model: 'Octavia',
        year: 2015,
        category: 'Sedan',
        color: 'Sort',
        price: 20
    }))*/
    .catch(err => console.log(err));
Order.sync().catch(err => console.log(err));
