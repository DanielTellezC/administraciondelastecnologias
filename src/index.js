const express = require("express");
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();


app.use(express.static(__dirname + '/public'));
//app.use('/css', express.static(__dirname +'public/css'));
//app.use('/img', express.static(__dirname +'public/img'));

require('./passport/local-auth');
require('./database');

// Configuraciones
app.set('views', path.join(__dirname,'views'));
app.engine('ejs', engine);
app.set('view engine','ejs');
app.listen(3000);

//Midlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretsession',
    resave: true,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage');
    next();
})
//Routes
app.use('/',require('./routes/index'));


//inicio del servidor
console.log("Este es el puerto: ", 3000);