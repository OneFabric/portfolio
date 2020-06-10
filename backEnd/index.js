var express = require('express');
var path = require('path');
const bodyParser = require('body-parser')
var mailer = require('sendmail')()
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
    mailer(
        {
            from: req.body.email,
            to: '1neFabric@gmail.com',
            subject: '[Portfolio] Message from ' + req.body.name + 'with phone#' +req.body.phone,
            html: req.body.message
        },
        function(err, reply) {
            console.log(err && err.stack)
        }
    )

})

lib.process()

app.listen(process.env.PORT || 8080);