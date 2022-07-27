// Importing express module
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const auth = require('./utils/auth');

// Using express and giving a port
const app = express();

const PORT = process.end.PORT || 8000;

// Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

// Starting server with listening function
app.listen(PORT, function (err) {
    if(err) {
        console.log('Error with starting server');
    } else {
        console.log('Listening at port' + PORT);
    }
});