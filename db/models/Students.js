const Sequelize = require('sequelize')
const db = require('../');


const Students = db.define('students', {
		name: {
			type: Sequelize.STRING,
			allowNull: false,
    },
    phone: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
});

module.exports = Students
