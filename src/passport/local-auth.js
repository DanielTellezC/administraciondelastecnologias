const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => {
    const user = await User.findById(id);
    done(null,user);
});

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    
    const user = await User.findOne({email:email});
    if(user){
        return done(null, false, req.flash('signupMessage','El email ya existe'));
    } else{
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
    
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({email:email});
    if(!user){
        return done(null, false, req.flash('signinMessage', 'No existe el usuario'));
    }
    if (!user.comparePassword(password)){
        return done(null, false, req.flash('signinMessage', 'Contraseña incorrecta'));
    }
    done(null,user);
}));