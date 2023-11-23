const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const port = 7000
const path = require('path')
const pageRouter = require('./routs/page')
const sessions = require('express-session')

const oneDay = 1000 * 60 * 60 * 24

app.use(sessions({
    secret: "skey",
    saveUninitialized: false,
    cookie: {
        maxAge: oneDay
    },
    resave: false

}))

app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'handlebars')

app.use((req, res, next) => {

    res.setHeader('Cache-Control', 'no-store')
    res.setHeader('Expires', '-1')
    res.setHeader('Pragma', 'no-chache')
    next()
})

app.engine('handlebars', handlebars.engine({
    layoutsDir: __dirname + '/views/layout',
    defaultLayout: 'index',
    extname: 'handlebars'

}))

app.use(express.static(path.join(__dirname, 'public')))


app.use(pageRouter)


app.use((req, res) => {
    res.status(404);
    res.render('err', { code: "404", error: " Page not found" })
})



app.listen(port, () => console.log(`Server is running on the port ${port}`))


