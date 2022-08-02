const router = require('express').Router();
const { Game, User } = require('../models');
const withAuth = require('../utils/auth');
const res = require('express/lib/response');

// Homepage GET request
router.get('/', withAuth, async (req, res) => {
  try {
    const gameData = await Game.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    // Serialize data so template can read it
    const games = gameData.map((game) => 
      game.get({ plain: true })
    );

    res.render('homepage', {
        ...games,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }});

// Search GET request
router.get('/search', withAuth, async (req, res) => {
  try {
    const gameData = await Game.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    // Serialize data so template can read it
    const games = gameData.map((game) => 
      game.get({ plain: true })
    );

    res.render('search', {
        ...games,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }});

// Favorites GET request
router.get('/favorites', withAuth, async (req, res) => {
  try {
    const gameData = await Game.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    // Serialize data so template can read it
    const games = gameData.map((game) => 
      game.get({ plain: true })
    );

    res.render('favorites', {
        ...games,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }});

// Login GET request
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
  }
  res.render('login');
});

module.exports = router;