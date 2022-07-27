const router = require('express').Router();
const { Game, User} = require('../models');
const withAuth = require('../utils/auth');

router.get('/login', (req, res) => {
    if (req.user) {
        res.render('')
    }
})