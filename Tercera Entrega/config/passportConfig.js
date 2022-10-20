import passport from 'passport'
import local from "passport-local"
import {createHash ,isValidPassword} from "../utils/utils.js"
import userService from "../modelUser.js"
const LocalStrategy = local.Strategy


const initializePassport = () => {

    passport.use('registered', new LocalStrategy({ passReqToCallback: true, usernameField: 'email' }, async (req, email, password, done) => {
        try {
            const { name, edad, direccion, telefono } = req.body;
            if (!name || !email || !password) return done(null, false);
            let exists = await userService.findOne({ email: email });
            if (exists) return done(null, false);
            let result = await userService.create({
                name,
                email,
                edad,
                direccion,
                telefono,
                password: createHash(password),
                avatar: `./avatar/${req.file.filename}`,
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

export default initializePassport