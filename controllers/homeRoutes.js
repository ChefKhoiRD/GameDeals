const router = require('express').Router();
const { Game, User } = require('../models');
const middleWare = require('../utils/auth');
const res = require('express/lib/response');

// Homepage GET request
router.get('/', async (req, res) => {
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
    }
  });

// Search GET request
router.get('/search/:id', async (req, res) => {
  try {
    const gameData = await Game.findByPk(req.params.id);
    const game = gameData.get({ plain: true });

    res.render('game', {
      ...game,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Favorites GET request
router.get('/favorites/:id', async (req, res) => {
   try { 
    const gameData = await Game.findByPk(req.params.id, {
      include: [
        {
          model: Game,
          attributes: [
            'id',
            'name',
            'date_created',
          ],
        },
      ],
    });

    const game = gameData.get({ plain: true });

    res.render('game', {
      ...game,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/favorites', middleWare, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Game }],
    });

    const user = userData.get({ plain: true });

    res.render ('favorites', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;