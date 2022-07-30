const router = require('express').Router();

// Get request for hompage
router.get('/', (req, res) => {
  res.render('homepage', {
    //logged_in: req.session.logged_in
  })
});

router.get('/login', (req, res) => {
    // if (req.session.logged_in) {
    //   res.redirect('/')
    //   return
    // }
    res.render(login);
  });

router.get('/search', (req, res) => {
  res.render('search', {
    //logged_in: req.session.logged_in
  })
});

router.get('/favorites', (req, res) => {
  res.render('favorites', {
    //logged_in: req.session.logged_in
  })
});

module.exports = router;