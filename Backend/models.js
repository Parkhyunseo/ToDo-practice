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
    color: {
        type:Sequelize.STRING,
    },
});

module.exports = { Sequelize, sequelize, Todo };


