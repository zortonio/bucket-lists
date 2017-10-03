const cookieParser = require('cookie-parser');
const session = require('express-session');
const compress = require('compression');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan')
const bodyParser = require('body-parser');
const path = require('path');
const port = process.env.port || 8000;
const app = express();

const sessionConfig = {
    saveUninitialized: true,
    secret: 'mermaidsAreReal',
    resave: false,
    name: 'session',
    rolling: true,
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 360000
    }
}

app.use(helmet());
app.use(compress());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, './public/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('alkdjflakdlfkalsdk'));
app.use(session(sessionConfig));

require('./server/config/mongoose.js');
const route_setter = require('./server/config/routes.js');
route_setter(app);

app.listen(port, () => { console.log(`Listening on port ${port}`) });