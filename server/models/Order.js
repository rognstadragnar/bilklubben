import Sequelize from 'sequelize';

const Order = {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    startdate: {
        type: Sequelize.DATE,
        allowNull: false

    },
    enddate: {
        type: Sequelize.DATE,
        allowNull: false

    },
    cost: {
        type: Sequelize.DECIMAL,
        allowNull: false
    }
};

export default Order;