/**
*Module dependencies.
*/

var express = require('express'),
    stylus = require('stylus'),
    nib = require('nib'),
    routes = require('./routes'),
    http = require('http');

/**
*App.
*/

var app =  express();
var server = http.createServer(app);

/** 
* App configuration
*/
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(stylus.middleware({ 
    src: __dirname + '/stylus',
    dest: __dirname + '/public',
    compile: function (str, path) {
      return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib())
        .import('nib');
      }
  }));
  //app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// app.configure('development', function(){
//   app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
// });

app.configure('production', function(){
  app.use(express.errorHandler()); 
});



/**
* Socket-io
*/

var io = require('socket.io').listen(server),
    votes = {
      'first':0,
      'second':0,
      'third':0,
      'four':0,
      'five':0,
      'six': 0
    };



io.sockets.on('connection', function (socket) {

  /**
  *implementation nicksnames of the clients
  **/
  socket.on('vote', function (song_id) {
    votes[song_id] += 1;
    console.log('laal');
    console.log(votes[song_id]);
    io.sockets.emit('setvote',{votes: votes[song_id], id: song_id});
  });

  /**
  *when the client disconnect
  **/

  socket.on('getvote', function () {
    if (!socket.nickname) return;

    delete nicknames[socket.nickname];
    socket.broadcast.emit('announcement', socket.nickname + ' disconnected');
    socket.broadcast.emit('nicknames', nicknames);
  });
  var i, len = votes.length;
  socket.on('get_song', function(){
    
  });

});


/**
* App routes.
*/
app.get('/', routes.index);

server.listen(3000);
var addr = server.address();
//console.log('its running on localhost'+':'+addr.port);
