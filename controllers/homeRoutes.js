const router = require('express').Router();
const res = require('express/lib/response')

router.get('/', (req, res) => {
  res.render('homepage', {
    logged_in: req.session.logged_in
  });
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/')
    return;
  }
  res.render('login');
});

router.get('/search', (req, res) => {
  res.render('search');
});

router.get('/favorites', (req, res) => {
  res.render('favorites');
});