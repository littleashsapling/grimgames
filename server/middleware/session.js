const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

module.exports = app => {
    app.use(session({
        secret: 'kdfg-ndlfkg343lfk_3533-tw4',
        resave: false,
        saveUninitialized: true,
        cookie: {
            // domain: 'localhost',
            secure: false,
            // maxAge: 1000 * 60 * 60 * 2 // Session cookie lasts 2 hours
        },
        store: new MongoStore({
            url: 'mongodb://localhost/user'
        }),
    }))
}