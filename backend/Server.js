const express = require("express")
const http = require("http")
var connection = require('./database');
const app = express()
const server = http.createServer(app)


app.get("/",function(req,res){
	let sql = "SELECT * FROM AdminLogin";
	connection.query(sql,function(err,results){
		if(err) throw err;
		res.send(results);
	})
})

server.listen(8000, function(){
	console.log("app is running on port 8000");
	connection.connect(function(err){
		if(err) throw err;
		console.log("db connected");
	})
})