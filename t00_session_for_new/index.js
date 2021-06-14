
const express = require('express')
const expressThymeleaf = require('express-thymeleaf')
const {TemplateEngine} = require('thymeleaf')
const bodyParser = require('body-parser')
const session = require('express-session')
const PORT = process.env.PORT ?? 8080

const app = express()
const templateEngine = new TemplateEngine()
app.engine('html', expressThymeleaf(templateEngine))
app.set('view engine', 'html')
app.set('views', __dirname + '/')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(
    session({
        secret: 'session secret',
        saveUninitialized: true
    })
)

let sess
let saveToSession = (req) => {
    sess = req.session
    let body = req.body

    sess.content = true
    sess.name = body.alias
    sess.alias = body.alias
    sess.age = body.age
    sess.description = body.description
    sess.photo = body.photo
    sess.experience = body.experience ? body.experience.length : 'none'
    sess.level = body.level
    sess.purpose = body.purpose
}

let renderForm = (req, res) => {
    sess = req.session
    return res.render('forget', {
        name: sess.name,
        alias: sess.alias,
        age: sess.age,
        description: sess.description,
        photo: sess.photo,
        experience: sess.experience,
        level: sess.level,
        purpose: sess.purpose})
}

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})

app.get('/', function (req, res) {
    sess = req.session
    if (sess.content === true) {
        return renderForm(req, res)
    }
    res.render('index')
})

app.post('/', (req, res) => {
    sess = req.session
    if (!req.body) {
        return res.sendStatus(400)
    }
    saveToSession(req)
    renderForm(req, res)
})

app.post('/forget', (req, res) => {
    req.session.content = ''
    return res.redirect('/')
})