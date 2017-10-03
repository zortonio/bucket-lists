const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = {
    login: function (req, res) {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (!user) { throw new Error(); }

                return User.validatePassword(req.body.password, user.password)
                    .then(() => {
                        completeLogin(req, res, user);
                    });
            })
            .catch(error => {
                res.status(401).json('Email/password combo not found.');
            });
    },
    logout: function (req, res) {
        console.log('Logging out server side.');

        req.session.destroy();

        res.clearCookie('userID');
        res.clearCookie('expiration');
        res.json(true);
    },
    register: function (req, res) {
        User.create({
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            listings: []
        })
            .then(user => {
                completeLogin(req, res, user);
            })
            .catch(error => {
                res.status(422)
                    .json(Object.keys(error.errors).map(key => error.errors[key].message));
            });
    }
};

function completeLogin(req, res, user) {
    req.session.user = user.toObject();

    delete req.session.user.password;

    res.cookie('userID', user._id.toString());
    res.cookie('expiration', Date.now() + 864000 * 1000);
    res.json(user);
}