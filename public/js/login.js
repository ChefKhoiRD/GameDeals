const express = require('express');
const session = require('express-session');
const path = require('path');
// const { allowedNodeEnvironmentFlags } = require('process');
// const { resourceLimits } = require('worker_threads');
const { request } = require('http');
//const { response } = require('express');

const app = express();

app.use(express.json());
app.app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/login'));
});

// Authenticate user
app.post('/auth', (req, res) => {
    // Get input fields
    let username = req.body.username;
    let password = req.body.password;

    // Checks if input fields are empty
    if (username && password) {
        // ==========================================
        // TO DO - MAKE SURE USER LOGIN DATA IS BEING FETECHED FROM THE RIGHT PLACE
        const response = await fetch('/api/users/login', {
        // ==========================================
            method: 'POST',
            body: JSON.stringify({username, password}),
        })
        // If error with post request, throw error
        if (error) throw error;

        // if account exists, authenticate and send to home page
        if (response.ok) {
            request.session.loggedin = true;
            request.session.username = username;
            res.redirect('/homepage');
        } else {
            res.send("Incorrect username or password");
        }
    response.end();
    }
});

app.get('/homepage', (req, res) => {
    if (req.session.loggedin) {
        res.send('Welcome back ' + req.session.username);
    } else {
        res.send('Please login to view');
    }
    res.end();
});