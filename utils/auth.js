module.exports = (app) => {
    // Sign up
    app.get('./login', (req, res) => res.render('login'))
};

            // const middleWare = (req, res, next) => {
            //     if (!req.user) {
            //         return next();
            //     } else {
            //         res.redirect('/login');
            //     }
            // };

app.get('/logout', (req, res) => {
    res.clearCookie('nToken');
    return res.redirect('/');
});

