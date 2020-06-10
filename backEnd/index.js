var express = require('express');
var app = express();
var path = require('path');
var lib = require('./process/process')

app.use(express.static(path.join(__dirname, '../frontEnd/public')))
app.use(express.static(path.join(__dirname, '../frontEnd/public/dist')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../frontEnd/public/dist/index.html'))
});

console.log("about to execute process!")
lib.process()

app.listen(process.env.PORT || 8080);