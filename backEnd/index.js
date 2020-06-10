var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
var lib = require('./process/process')

var app = express();

app.use(express.static(path.join(__dirname, '../frontEnd/public')))
app.use(express.static(path.join(__dirname, '../frontEnd/public/dist')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../frontEnd/public/dist/index.html'))
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/assets/mail/contact_me.php', function(req, res) {
    console.log("getting contact_me.php request!")
    console.log(req.body)
})

lib.process()

app.listen(process.env.PORT || 8080);