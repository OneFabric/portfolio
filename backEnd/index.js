var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname, '../frontEnd/public')))
app.use(express.static(path.join(__dirname, '../frontEnd/public/dist')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../frontEnd/public/dist/index.html'))
});


app.listen(process.env.PORT || 8080);