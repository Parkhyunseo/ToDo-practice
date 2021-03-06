// Routing Config
var express = require('express');
var app = express();
//var morgan = require('morgan');
var bodyParser = require('body-parser');
var todo = require('./api/todo');

/*
if(process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));
}
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('../Frontend/'));
app.use('/todo', todo);

module.exports = app;

//binding