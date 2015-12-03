
function generateResponse(req, res) {
	var pg = require('pg');
	var connectionString = 'postgres://groupjjsr:groupjjsrpassword@groupjjsr.cup5jjaxtuqn.us-west-2.rds.amazonaws.com:5432/groupjjsr';
	var client = new pg.Client(connectionString);
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		client.query('select * from personinfo limit 10;', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
			console.log(result.rows[0]);
			result = result.rows[0]["name"];
			res.render('login.ejs', {result: result});
			client.end();
		});
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