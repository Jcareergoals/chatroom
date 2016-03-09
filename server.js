var express = require('express'); 
var path = require('path');
var app = express(); 

// set static, views and veiw engine
app.use(express.static(path.join(__dirname, '/static'))); 
app.set('views', path.join(__dirname, '/views')); 
app.set('view engine', 'ejs');

app.get('/', function(req, res){
	res.render('index'); 
});
// set port server will be listening to
var server = app.listen(1234, function(){
	console.log("Listening at port: 1234"); 
}); 

var existing_users = []; 
var io = require('socket.io').listen(server); 
io.sockets.on("connection", function(socket){
	socket.on("new_user", function(data){ 
		var new_user = {
			name : data.name,
			id : socket.id
		}
		existing_users.push(new_user); 

		io.emit("updated_users", {users : existing_users}); 
		socket.broadcast.emit("alert_users", { new_user : new_user.name}); 
	});  
	socket.on("get_updated_list", function(){
		socket.emit("updated_users_list", {users: existing_users}); 
	}); 
}); 
