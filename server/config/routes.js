const path = require('path');
const authUsers = require('./../controllers/auth.users.js');
const users = require('./../controllers/users.js');

module.exports = function (app) {
    app.post('/items/add', (req, res, next) => { users.addItem(req, res)})
    app.put('/items/status/change', (req, res, next) => { users.changeStatus(req, res)})
    app.get('/users/all', (req, res, next) => { users.all(req, res)})
    app.get('/users/info/:id', (req, res, next) => { users.getUser(req, res)})
    app.get('/users/current', (req, res, next) => { users.current(req, res)})
    app.post('/users/login', (req, res, next) => { authUsers.login(req, res) })
    app.post('/users/register', (req, res, next) => { authUsers.register(req, res) })
    app.delete('/users/logout', (req, res, next) => { authUsers.logout(req, res) })
    app.all("*", (req, res, next) => {
        res.sendFile(path.resolve("./public/dist/index.html"));
    });
}