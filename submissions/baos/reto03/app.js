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

var app =  express(),
    server = http.createServer(app);

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
    },
    songs = {
        'Drop of whisper': ['first','Drop of whisper', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Antony_Raijekov_-_04_-_Drop_of_whisper_2005.mp3'],
        'Lightout': ['second','Lightout','https://github.com/BogotaJS/bday2012/raw/master/songs/Antony_Raijekov_-_09_-_Lightout_2003.mp3'],
        'While we walk': ['third','While we walk', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Antony_Raijekov_-_11_-_While_We_Walk_2004.mp3'],
        'By the coast': ['four','By the coast', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Antony_Raijekov_-_12_-_By_the_Coast_2004.mp3'],
        'Mdma pt 2': ['five','Mdma pt 2', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Morus_Alba_-_01_-_MDMA_Pt_2.mp3'],
        'Goodbye': ['six','Goodbye', 'https://github.com/BogotaJS/bday2012/raw/master/songs/Morus_Alba_-_02_-_Goodbye.mp3']
  };



io.sockets.on('connection', function (socket) {
    /**
    *
    **/
    io.sockets.emit('connected',votes);
    /**
    *add vote to a song
    **/
    socket.on('vote', function (song_id) {
      votes[song_id] += 1;
      io.sockets.emit('setvote',{votes: votes[song_id], id: song_id});
    });

    /**
    *send the url of the song selected
    **/
    socket.on('finish_votations',function(most_voted_id){
        console.log('finish');
        for(var key in songs){
            if(songs[key][0] === most_voted_id){
                socket.emit('update_song',songs[key][2]);
                io.sockets.emit('reset');
                break;
            }
        }
    });

});


/**
* App routes.
*/
app.get('/', routes.index);
app.get('/vote', routes.vote);

server.listen(3000);
var addr = server.address();
//console.log('its running on localhost'+':'+addr.port);
