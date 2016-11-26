import Sequelize from 'sequelize';

const Car = {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    make: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2016,
    },
    category: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    km: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10000,
    },
    motor: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '1,8l TDI',
    },
    bhp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 110,
    },
    seats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Utmerket',
    },
    poslat: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '58.969976',
    },
    poslng: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: '5.733107',
    },
    imglg: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'largeimg.jpg',
    },
    imgsm: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'smallimg.jpg',
    },
    price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
};
export default Car;
