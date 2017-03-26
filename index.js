var express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    _ = require('lodash'),
    nedb = require('nedb'),
    userDb = new nedb({filename: './db/users', autoload: true}),
    chatGroupDb = new nedb({filename: './db/chatGroups', autoload: true}),
    userSocketMapping = {};

app.use(express.static('node_modules'));
app.use(express.static('static'));

app.get('/chat', function (req, res) {
    chatGroupDb.find({authorList: req.query.authorList.sort()}, function (err, chatGroupList) {
        if (err || _.isEmpty(chatGroupList)) {
            res.json([]);
        } else {
            res.json(chatGroupList[0].messageList);
        }
    });
});

app.get('/:default', function(req, res) {
    res.sendFile(__dirname + '/static/index.html');
});

io.on('connection', function(socket) {
    socket.on('registerUser', function (newUser) {
        userDb.find({id: newUser.id}, function (err, existingUserList) {
            if (existingUserList.length === 0) {
                userDb.insert(newUser, function (err, user) {
                    if (err) { console.error(err); }
                    updateUser(user);
                });
            } else {
                updateUser(existingUserList[0]);
            }
        });
        function updateUser (user) {
            userSocketMapping[user.id] = socket.id;
            socket.emit('registerUser', user);
            userDb.find({}, function (err, contactList) {
                io.of('/').emit('updateContactList', contactList);
            });
        }
    });

    socket.on('getContactList', function () {
        userDb.find({}, function (err, contactList) {
            socket.emit('updateContactList', contactList);
        });
    });

    socket.on('postMessage', function (from, to, message) {
        chatGroupDb.update({authorList: [from, to].sort()}, {$push: {messageList: {author: from, message: message}}}, {upsert: true}, function () {
            socket.to(userSocketMapping[to]).emit('postMessage', from, message);
        });
    });

    socket.on('disconnect', function() {
        // TODO: set user status offline
    });
});

http.listen(8080, function () {
    console.log('Server runnning. Open your browser and hit http://localhost:8080/');
});
