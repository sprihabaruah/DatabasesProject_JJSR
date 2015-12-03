
//function getResults(req, db, callback) {
//	
//	var whichDay = req.query.DAY;
//	var when = req.query.TIME;
//	
//	// need to parse. 
//	//{"hours.Monday.open":{$gt: "15:00"},"hours.Monday.close":{$gt:"16:00"}}
//	
//	var parseArray = when.split(" ");
//	// [0] = open , [2] = close
//	var dayOpenPart = {};
//	var dayClosePart = {};
//	dayOpenPart['$gt'] = parseArray[0];
//	dayClosePart['$gt'] = parseArray[2];
//	
//	var keyToOpen = 'hours.' + whichDay + '.open';
//	var keyToClose = 'hours.' + whichDay + '.close';
//	query[keyToOpen] = dayOpenPart; 
//	query[keyToClose] = dayClosePart;
//	// console.log(query);
//	var cursor = db.collection('business').find(query);
//	var results = [];
//	cursor.each(function(err, doc) {
//		if (doc != null) {
//			//// console.log(doc);
//			results.push(doc.name);
//		} else {
//			callback(results);
//		}
//	});
//};



function getResults(req, callback) {
	var temp = req.options;
	// console.log(req);
};

function generateResponse(req, res) {
	console.log("request " + req.query.test)
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
			// // console.log(result);
			// // console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			// console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
			client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\';', function(err, result) {
				if(err) {
					return console.error('error running query', err);
				}
				// retrieving the first out of the first 10 queries. 
				// // console.log(result.rowCount);
				var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
				// // console.log(result);
				// console.log(result.rows[randomIndex]);
				
				result = result.rows[randomIndex];
				optionCollection.push(result);
//				res.render('login.ejs', {result: result});
				// client.end();
				
				client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Fast and the Furious\';', function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					// retrieving the first out of the first 10 queries. 
					// // console.log(result.rowCount);
					var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
					// console.log(result.rows[randomIndex]);
					
					result = result.rows[randomIndex];
					optionCollection.push(result);
//					res.render('login.ejs', {result: result});
					// client.end();
					
					client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Boondock Saints\';', function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						// retrieving the first out of the first 10 queries. 
						// // console.log(result.rowCount);
						var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
						// console.log(result.rows[randomIndex]);
						
						result = result.rows[randomIndex];
						optionCollection.push(result);
//						res.render('login.ejs', {result: result});
						// client.end();
					});
				});
			});
		});
		totalOptions.push(optionCollection)


		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			// // console.log(result);
			// // console.log(result.rowCount);
			var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
			// console.log(result.rows[randomIndex]);
			
			result = result.rows[randomIndex];
			optionCollection2.push(result);
//			res.render('login.ejs', {result: result});
			// client.end();
			client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Harry Potter and the Chamber of Secrets\';', function(err, result) {
				if(err) {
					return console.error('error running query', err);
				}
				// retrieving the first out of the first 10 queries. 
				// // console.log(result.rowCount);
				var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
				// // console.log(result);
				// console.log(result.rows[randomIndex]);
				
				result = result.rows[randomIndex];
				optionCollection2.push(result);
//				res.render('login.ejs', {result: result});
				// client.end();
				client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Lord of the Rings: The Two Towers\';', function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					// retrieving the first out of the first 10 queries. 
					// // console.log(result.rowCount);
					var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
					// console.log(result.rows[randomIndex]);
					
					result = result.rows[randomIndex];
					optionCollection2.push(result);
//					res.render('login.ejs', {result: result});
					// client.end();
					client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Bourne Identity\';', function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						// retrieving the first out of the first 10 queries. 
						// // console.log(result.rowCount);
//						console.log(result.rows[0].name)
						var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
						// console.log("TESTING" + result.rows[randomIndex]);
						
						result = result.rows[randomIndex];
						optionCollection2.push(result);
						
						totalOptions.push(optionCollection2);
						res.render('game.ejs', {totalOptions: totalOptions});		
						
						client.end();
					});
				});
			});
		});
		
		
		
		
		
		
//		console.log(optionCollection2[0])
		
//		console.log(totalOptions[0])
		
		getResults(req, function(totalOptions) {
			
		});
		
	});
}

exports.displayResponse = function(req, res){
	console.log("HEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHEREHERE");
	generateResponse(req, res);
};


//app.get('/login', function(req, res, next) {
//	res.render('login',{result:result});
//
//	  // sending a response does not pause the function
//	});