var express = require('express')
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.use(express.static(__dirname))
app.get('/', function(req,res){
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function(socket){
  console.log('A user is connected.');
  socket.broadcast.emit('user connected', 'A user has connected')

  socket.on('chat message', function(msg){
    console.log('message: ', msg);
    io.emit('chat message', msg)
  })

  socket.on('typing', function(){
    socket.broadcast.emit('typing')
  })

  socket.on('stopped typing', function(){
    console.log('stopped typing');
    socket.broadcast.emit('stopped typing')
  })

  socket.on('disconnect', function(){
    console.log('user disconnected');
    socket.broadcast.emit('user disconnected', 'A user has disconnected')
  });
})

http.listen(3000, function(){
  console.log('Listening on *:3000');
})
