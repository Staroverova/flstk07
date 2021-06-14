const express = require('express')
const cookieSession = require('cookie-session')
const expressThymeleaf = require('express-thymeleaf')
const {TemplateEngine} = require('thymeleaf')
const PORT = process.env.PORT ?? 8080

const app = express()
const templateEngine = new TemplateEngine()

app.engine('html', expressThymeleaf(templateEngine))
app.set('view engine', 'html')
app.set('views', __dirname + '/')

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})

const moment = require('moment')
let date = new Date()
let updateCounter = moment(date).add(1, 'm').toDate()

app.use(cookieSession({
    name: 'counter',
    keys: ['key1', 'key2'],
    maxAge: 60000
}))

app.get('/', function (req, res) {
    if (Number(updateCounter) <= Number(new Date())) {
        req.session.counter = 0;
        updateCounter = moment(new Date()).add(1, 'm').toDate();
    }
    req.session.counter = (req.session.counter || 0) + 1
    res.render('index', {counter: req.session.counter})
})