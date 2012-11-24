var path = require( 'path' );
var http = require( 'http' );
var express = require('express');
var app = express();
app.use('/components', express.static(__dirname + '/components'));
/*app.configure(function(){
  app.use(express.static(path.join(__dirname, 'components')));
})*/

var server = http.createServer(app);
var io = require('socket.io').listen(server);

server.listen(8080);
app.get( '/', function( req, res ){
  res.sendfile(__dirname + '/index.html');
})

var songs = [
  {id: 1, name: "Morus_Alba_-_02_-_Goodbye.mp3", votes: 0},
  { id: 2, name: "Antony_Raijekov_-_09_-_Lightout_2003.mp3", votes: 0 },
  { id:"3", name:"Antony_Raijekov_-_11_-_While_We_Walk_2004.mp3", votes: 0 },
  { id: "4", name: "Antony_Raijekov_-_12_-_By_the_Coast_2004.mp3", votes: 0 },
  { id: "5", name: "Morus_Alba_-_01_-_MDMA_Pt_2.mp3", votes: 0 },
  { id: "6", name: "Antony_Raijekov_-_04_-_Drop_of_whisper_2005.mp3", votes: 0}
]

var current_song;

io.sockets.on('connection', function (socket) {
  console.log( 'Connection...', socket );
  socket.emit('ready', { songs: songs });
  socket.on('start playing', function (data) {
    current_song = data.song_id;
    console.log(data);
  });
  socket.on( 'vote', function( data ){
    var song_id = +data.song_id;
    for( var i in songs ){
      if( songs[ i ].id == song_id ){
        songs[ i ].votes++;
        break;
        console.log( songs[ i ] ); 
      }
    }
    //votes[ data.song_id ] = votes[ data.song_id ] + 1;
    //console.log( votes );
    var songs_by_order = songs.sort( function( modelA, modelB ){
      if(modelA.votes > modelB.votes ) return -1;
      if(modelA.votes < modelB.votes ) return 1;
      return 0; 
    })
    socket.emit( 'order songs', { songs: songs_by_order } );
    socket.broadcast.emit( 'order songs', { songs: songs_by_order } );
  })
});


