
function generateResponse(req, res) {
	var pg = require('pg');
	var connectionString = 'postgres://groupjjsr:groupjjsrpassword@groupjjsr.cup5jjaxtuqn.us-west-2.rds.amazonaws.com:5432/groupjjsr';
	var client = new pg.Client(connectionString);
	var totalOptions = [];
	var optionCollection = [];
	var optionCollection2 = [];
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		
		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'300\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// console.log(result);
			// console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
		});
		
		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			// console.log(result);
			console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
		});
		
		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Fast and the Furious\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
		});
		
		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Boondock Saints\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
		});
		totalOptions.push(optionCollection)


		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// console.log(result);
			// console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection2.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
		});
		
		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Harry Potter and the Chamber of Secrets\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			// console.log(result);
			console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection2.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
		});
		
		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Lord of the Rings: The Two Towers\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection2.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
		});
		
		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Bourne Identity\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection2.push(result);
//			res.render('login.ejs', {result: result});
			console.log(totalOptions);
			client.end();
		});
		totalOptions.push(optionCollection2)		
	});
}

exports.displayResponse = function(req, res){
	generateResponse(req, res);
};


//app.get('/login', function(req, res, next) {
//	res.render('login',{result:result});
//
//	  // sending a response does not pause the function
//	});