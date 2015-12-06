var express          = require('express'),
app                  = express(),
http                 = require('http').Server(app);
io                   = require('socket.io')(http);

app.
	use(express.static(__dirname + '/public'));
app.
	get('/', 
		function (req, res) {
			res.sendFile(__dirname+'/public/html/index.html');
		});

io.
	on('connection',
    function(socket){
  		console.log('a user connected');
      socket.
        on('disconnect',
          function(){
            console.log('user disconnected');
          }).
        on('chat message',
  					function(msg){
  						io.emit('chat message', msg);
  					});
		});

http.
	listen(3000,
		function(){
  			console.log('listening on *:3000');
  
