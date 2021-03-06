const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

const {authSecret} = require('../.env')

module.exports = app => {
  const params = {
    secretOrKey: authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const strategy = new Strategy(params, (payload, done) => {
    app.db('users').where({id: payload.id}).first()
      .then(user => done(null, user ? {...payload} : false))
      .catch(err => done(err, false))
  })

  passport.use(strategy)

  return {
    autenticate: () => passport.authenticate('jwt', {session: false})
  }
}