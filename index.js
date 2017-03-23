var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

app.use(express.static('node_modules'));
app.use(express.static('static'));

app.get('/:any', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket) {
    console.log('user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
    socket.on('postMessage', function (msg) {
        console.log('have to post message: ' + msg);
    });
});

http.listen(8080, function() {
    console.log('Listening to port: 8080');
});
