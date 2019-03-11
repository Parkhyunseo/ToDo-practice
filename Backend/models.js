const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    logging: false // default => console.log
});

const Todo = sequelize.define('Todo', {
    text: {
        type:Sequelize.STRING,
    },
    checked: {
        type:Sequelize.INTEGER,
    },
    lastModifiedDate: {
        type:Sequelize.DATE,
    },
});

module.exports = { Sequelize, sequelize, Todo };


