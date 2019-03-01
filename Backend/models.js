const Sequelize = require('sequelize');
const sequelize = new Sequelize({
   dialect: 'sqlite', // Kind of DMBS
   storage: './db.sqlite', 
   logging: false // default => consolt.log
});

const Todo = sequelize.defin('Todo', {
    id: {
        type:Sequelize.INTEGER,
        unique: true
    },
    text: {
        type:Sequelize.STRING,
    },
    color: {
        type:Sequelize.STRING,
    },
    modified: {
        type:Sequelize.DATE,  
    },
    done: {
        type:Sequelize.BOOLEAN,
    }
});

module.exports = { Sequelize, sequelize, Todo };


