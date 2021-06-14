const express = require('express')
const expressThymeleaf = require('express-thymeleaf')
const {TemplateEngine} = require('thymeleaf')
const bodyParser = require('body-parser')
const CSVParser = require('./parser')
const PORT = process.env.PORT ?? 8080

const app = express()
const templateEngine = new TemplateEngine()
app.engine('html', expressThymeleaf(templateEngine))
app.set('view engine', 'html')
app.set('views', __dirname + '/')
app.use(bodyParser.urlencoded({extended: false}))

app.listen(PORT, () => {
    console.log(`Server has been started on port ${PORT}...`)
})

app.get('/', async function(req, res) {
    res.render('index')
})

app.post('/', async function(req, res) {
    const data = await CSVParser.parseCSV(req.body.csv)
    const table = CSVParser.transform(data)
    res.render('index', {
        table: JSON.stringify(table)
    })
})