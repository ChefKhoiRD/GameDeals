const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if(!userData) {
            res
              .status(400)
              .json({ message: "Incorrect email or password" });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if(!validPassword) {
            res
              .status(400)
              .json({ message: "Incorrect email or password" });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: "Successfully logged in." });
        })
    } catch(err) {
        res.status(400).json(err);
    }
});

router.post('/logout', async (req, res) => {
    if(req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.put('/', async (req, res) => {
    const userData = await User.findOne({ where: { id: req.session.user_id }});
    if (userData) {
    const updated = await User.update({ last_search: req.body.last_search}, { where: { id: req.session.user_id }})
    console.log(updated);
    return res.json(updated);
    }
    return res.status(400).json({error: "failed"});
})

module.exports = router;