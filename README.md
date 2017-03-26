# chatUp
A minuscule chat application built utilizing Web Sockets. Tested with Google Chrome v56.0.2924.87. Requires popups to be enabled for login using Google. Other registered users appear on the left, selecting any will create a chat room.

## Features
* Responsive (RWD), single page (SPA) chat application using Angular Material
* Client side MVC using Angular 1.x
* Login using Google Firebase API
* Embedded NoSQL database using nedb
* NPM for package and dependency management

## Build
Clone the repository and run:
```
npm install
npm start
```

## Known bugs
* When chat history is loaded after getting a new message, the new message appears twice.
