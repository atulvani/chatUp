var express = require('express'),
    app = express();

app.use(express.static('node_modules'));
app.use(express.static('static'));

app.get('/:any', function (req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

app.listen(8080, function() {
    console.log('Listening to port: 8080');
});
