import Sequelize from 'sequelize';
import Car from 'Car';
import User from 'User';
import { sequelize } from '_db';

const Rent = sequelize.define('bk_car', {
    rid: {

    },
    startdate: {

    },
    enddate: {

    },
    carid: {

    },
    userid: {

    }
});

rent.hasOne(Car, {cid});
rent.hasOne(User, {uid})


export default Rent;