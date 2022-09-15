const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { createHash, isValidPassword } = require("../utils/utils")
const userService = require("../model")

const initializePassport = () => {

    passport.use('registered', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            const { name } = req.body;
            if (!name || !email || !password) return done(null, false);
            let exists = await userService.findOne({ email: email });
            if (exists) return done(null, false);
            let result = await userService.create({
                name,
                email,
                password: createHash(password)
            })
            //SI TODO SALIÓ BIEN
            return done(null, result)
        }
        catch (error) {
            return done(error);
        }
    }))

    passport.use('login', new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            if (!email || !password) return done(null, false);
            let user = await userService.findOne({ email: email });
            console.log("En la ruta passworslogin", user, password)
            console.log("que muestra isvalid en la ruta", isValidPassword(user, password))
            if (!user) return done(null, false);
            if (!isValidPassword(user, password)) return done(null, false);
            return done(null, user)
        } catch (error) {
            console.log(error);
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })
    passport.deserializeUser(async (id, done) => {
        let result = await userService.findOne({ _id: id })
        return done(null, result);
    })
}

module.exports = initializePassport