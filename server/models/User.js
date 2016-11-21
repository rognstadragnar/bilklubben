import Sequelize from 'sequelize';

const UserModel = {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    points: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            min: 0
        }
    }
};

export default UserModel;