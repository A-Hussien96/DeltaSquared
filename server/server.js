const express = require('express')
const app = express()
const port = 5000
var mysql = require("mysql");
var cors = require("cors");
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(function(req, res, next){
	res.locals.connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'ahmed123456',
		database : 'delta'
	});
	res.locals.connection.connect();
	next();
});

app.get(`/books`, function(req, res, next) {
	res.locals.connection.query(`SELECT * from books`, function (error, results, fields) {
		if (error) throw error;
		// console.log(`Successful selection from books`)
		res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
	});
});

app.post(`/books`, function(req, res, next) {
	let {id, name} = req.body;
	console.log(`insert into books values(${id}, ${name})`)
	res.locals.connection.query(`insert into books values(${id}, "${name}")`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null}));
	});
});
app.post(`/deleteBooks`, function(req, res, next) {
	let {id, name} = req.body;
	console.log(`delete from books where id = ${id} and name = "${name}"`)
	res.locals.connection.query(`delete from books where id = ${id} and name = "${name}"`, function (error, results, fields) {
		if (error) throw error;
		res.send(JSON.stringify({"status": 200, "error": null}));
	});
});

app.get('/', function(req, res, next) {
	res.send('Enter after the slash the name of the table')
});

// app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
