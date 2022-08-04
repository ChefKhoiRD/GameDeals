const router = require('express').Router();
const { Game, User } = require('../models');
const withAuth = require('../utils/auth');
const res = require('express/lib/response');
const fetch = require('node-fetch');
let gameArray = [];

// Homepage GET request
router.get('/', withAuth, async (req, res) => {
  try {
    const gameData = await User.findOne({ where: { id: req.session.user_id }});

    let gameTitle = gameData.last_search;

    console.log(gameTitle);

    const response = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=6`)
    const data = await response.json();

    console.log(data)

    for (let i = 0; i < data.length; i++) {
        let newGameTitle = data[i].external;
        let newGameId = data[i].gameID;
        let newThumb = data[i].thumb;
    
        gameArray[i] = {
            gtitle: newGameTitle,
            id: newGameId,
            thumb: newThumb,
        }
    }

    console.log(gameArray);
      

    // Serialize data so template can read it
    // const games = gameArray.map({ plain: true });

    res.render('homepage', {
        ...gameArray,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
     }});

// Search GET request
router.get('/search/:id', withAuth, async (req, res) => {
  try {
    const gameId = req.params.id;
    console.log(gameId);
    const response = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${gameId}`)
    const data = await response.json();

    let games = [];

    games.gtitle = data.info.title;
    games.thumb = data.info.title;
    for (let i = 0; i < data.deals.length; i++) {
      if (data.deals[i].storeID === 1) {
        games.steamPrice = data.deals[i].price;
      } else if (data.deals[i].storeID === 7) {
        games.gogPrice = data.deals[i].price;
      } else if (data.deals[i].storeID === 11) {
        games.humblePrice = data.deals[i].price;
      }
    }
    // Serialize data so template can read it
    // const games = gameData.map((game) => 
    //   game.get({ plain: true })
    // );

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