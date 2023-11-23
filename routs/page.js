const express = require('express')
const router = express.Router()



let username = "sample@gmail.com"
let pswd = 123;
let name = 'Muhammed Rafi P'

let session

router.get('/', (req, res) => {
    if (req.session.user) {
        res.render('home', { name })
    } else {

        res.render('login')
    }
})

router.post('/', (req, res) => {

    if (req.body.email == username && req.body.password == pswd) {
        session = req.session;
        session.user = req.body.email;
        res.redirect('/')
    } else {
        res.render('login', { status: 'Incorrect Username or Password' })
    }
})


router.get('/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie()
    res.redirect('/')
})


module.exports = router;

