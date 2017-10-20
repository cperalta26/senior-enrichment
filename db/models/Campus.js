const Sequelize = require('sequelize')
const db = require('../');


const Campus = db.define('campus', {

    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    phone: Sequelize.STRING,
    address: Sequelize.STRING
});

module.exports = Campus;
