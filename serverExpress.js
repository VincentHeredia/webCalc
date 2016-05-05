var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var calc = require('./calc');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.post('/calcEval', urlencodedParser, function (req, res) {
	console.log("-------------------REQUEST-------------------");
	console.log("Got Post From Calc: " + req.body.input);

	userInput = req.body.input || "0";

	console.log("Expression: " + userInput);
	var equals = calc.evaluate(userInput);

	var returnValue = equals[0];
	var returnMessage = equals[1];
	if(returnMessage == ""){
		returnMessage = "None";
	}
	console.log("Equals: " + returnValue + " Message: " + returnMessage);

	res.status(200); //Not needed, automaticly set by express
	res.set('Content-Type', 'text/plain');
	
	console.log("---------------------------------------------");
	
	return res.send({ 
		value: returnValue,
		message: returnMessage
	});
});

var server = app.listen(8000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

});








