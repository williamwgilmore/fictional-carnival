const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/view/index.html');
});

app.get('/break', function(req, res){
	res.sendFile(__dirname + '/public/view/break.html');
});

app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/view/404.html');
});

app.listen(3000, function() {
	console.log('App listening on port 3000');
});