var express = require('express'); 
var path = require('path');
var app = express(); 

// set static, views and veiw engine
app.use(express.static(path.join(__dirname, '/static'))); 
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'ejs');

app.get('/', function(req, res){

});

// set port server will be listening to
var server = app.listen(1234, function(){
	console.log("Listening at port: 1234"); 
}); 

var io = require('socket.io').listen(server); 
io.sockets.on("connection", function(socket){
	sockets.on("new_user_entered_chatroom", function(data){
		// log the data recieved with the new_user... event to the console
		console.log(data);
		// text for new user event :)
		// store users in variable and return json containing existing users and new user 
	}); 
}); 
