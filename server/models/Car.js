import Sequelize from 'sequelize';
import { sequelize } from '_db';

const Car = sequelize.define('bk_car', {
    id: {
        type: Sequelize.STRING
    },
    make: {

    },
    model: {

    },
    specs: {

    },
    price: {

    }
})

export default Car;