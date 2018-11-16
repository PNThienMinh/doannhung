//import the express module
var express = require('express');

//import body-parser
var bodyParser = require('body-parser');

//store the express in a variable 
var app = express();

//configure body-parser for express
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var http = require('http').Server(app);
var port = process.env.PORT || 3000;



app.post('/', function (req, res) {
	
	console.log("request.method: " + req.method);
	
	res1 = {
		textdata: req.body,
	};

	//this line is optional and will print the response on the command prompt
	//It's useful so that we know what infomration is being transferred
	//using the server
	console.log(res1);

	//convert the response in JSON format
	res.end(JSON.stringify(res1));
});

http.listen(port, function () {
	console.log('listening on *:' + port);
});
