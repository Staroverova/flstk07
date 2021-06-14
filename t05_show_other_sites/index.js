const express = require('express')
const expressThymeleaf = require('express-thymeleaf')
const {TemplateEngine} = require('thymeleaf')
const bodyParser = require('body-parser')
const session = require('express-session')
const axios = require('axios')
const htmlSpecialChars = require('htmlspecialchars')
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
        secret: 'password secret',
        saveUninitialized: true
    })
)

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})

app.get('/', function (req, res) {
    const ss = req.session
    res.render('index', {
        url: ss.url,
        content: ss.content
    })
})

app.post('/', async (req, res) => {
    let url = req.body.url
    let ss = req.session

    const html = await axios.get(url)

    ss.url = `url: ${url}`
    ss.content = JSON.stringify(html.data)

    return res.redirect('/')
})

app.get('/delete', async (req, res) => {
    let ss = req.session
    ss.url = ''
    ss.content = ''
    return res.redirect('/');
})