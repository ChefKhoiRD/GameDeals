const middleWare = (req, res) => {
    if (!req.user) {
        return next();
    } else {
        res.redirect('/login');
    }
};

module.exports = middleWare;