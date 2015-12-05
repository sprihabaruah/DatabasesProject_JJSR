var express = require('express');
var router = express.Router();

// router.get('/game', function(req, res, next) {
//     res.render('game.ejs', {result: totalOptions});
// });
var totalOptions = [];
var optionCollection = [];
var optionCollection2 = [];

var allQueriesForTitanic = [];
var allQueriesForInception = [];
var allQueriesForTheGodFather = [];
var allQueriesForGeneral = [];

///// TITANIC QUERIES //////

var question1ForTitanic = [];
question1ForTitanic.push('Which of the following actors played a role in the movie Titanic?');
question1ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and m.tagline = \'Nothing on Earth could come between them.\' ORDER BY RANDOM() LIMIT 1;');
question1ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;');
question1ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;');
question1ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTitanic.push(question1ForTitanic);
allQueriesForGeneral.push(question1ForTitanic);

var question2ForTitanic = [];
question2ForTitanic.push('Who is the director of the movie Titanic?');
question2ForTitanic.push('Select p.name From movieinfo m, personinfo p Where m.title = \'Titanic\' and m.directorid = p.personid and m.tagline = \'Nothing on Earth could come between them.\';');
question2ForTitanic.push('Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
question2ForTitanic.push('Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
question2ForTitanic.push('Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
allQueriesForTitanic.push(question2ForTitanic);
allQueriesForGeneral.push(question2ForTitanic);

var question3ForTitanic = [];
question3ForTitanic.push('When did the movie Titanic release?');
question3ForTitanic.push('Select m.releasedate From movieinfo m Where m.title = \'Titanic\' and m.tagline = \'Nothing on Earth could come between them.\';');
question3ForTitanic.push('Select m.releasedate From movieinfo m Where m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;');
question3ForTitanic.push('Select m.releasedate From movieinfo m Where m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;');
question3ForTitanic.push('Select m.releasedate From movieinfo m Where m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTitanic.push(question3ForTitanic);
allQueriesForGeneral.push(question3ForTitanic);

var question4ForTitanic = [];
question4ForTitanic.push('Which actor plays the role of the character of Old Rose in Titanic?');
question4ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character = \'Old Rose\';');
question4ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Old Rose\' ORDER BY RANDOM() LIMIT 1;');
question4ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Old Rose\' ORDER BY RANDOM() LIMIT 1;');
question4ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Old Rose\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTitanic.push(question4ForTitanic);
allQueriesForGeneral.push(question4ForTitanic);

var question5ForTitanic = [];
question5ForTitanic.push('Which actor plays the role of the character Caledon Cal Hockley in the movie Titanic?');
question5ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character = \'Caledon Cal Hockley\';');
question5ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Caledon Cal Hockley\' ORDER BY RANDOM() LIMIT 1;');
question5ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Caledon Cal Hockley\' ORDER BY RANDOM() LIMIT 1;');
question5ForTitanic.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Caledon Cal Hockley\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTitanic.push(question5ForTitanic);
allQueriesForGeneral.push(question5ForTitanic);

/////// INCEPTION QUERIES //////

var question1ForInception = [];
question1ForInception.push('Which of the following actors played a role in the movie Inception?');
question1ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' ORDER BY RANDOM() LIMIT 1;');
question1ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;');
question1ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;');
question1ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForInception.push(question1ForInception);
allQueriesForGeneral.push(question1ForInception);

var question2ForInception = [];
question2ForInception.push('Who is the director of the movie Inception?');
question2ForInception.push('Select p.name From movieinfo m, personinfo p Where m.title = \'Inception\' and m.directorid = p.personid;');
question2ForInception.push('Select p.name From movieinfo m, personinfo p Where m.title != \'Inception\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
question2ForInception.push('Select p.name From movieinfo m, personinfo p Where m.title != \'Inception\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
question2ForInception.push('Select p.name From movieinfo m, personinfo p Where m.title != \'Inception\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
allQueriesForInception.push(question2ForInception);
allQueriesForGeneral.push(question2ForInception);

var question3ForInception = [];
question3ForInception.push('When did the movie Inception release?');
question3ForInception.push('Select m.releasedate From movieinfo m Where m.title = \'Inception\';');
question3ForInception.push('Select m.releasedate From movieinfo m Where m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;');
question3ForInception.push('Select m.releasedate From movieinfo m Where m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;');
question3ForInception.push('Select m.releasedate From movieinfo m Where m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForInception.push(question3ForInception);
allQueriesForGeneral.push(question3ForInception);

var question4ForInception = [];
question4ForInception.push('Which actor plays the role of the character Eames in the movie Inception?');
question4ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character = \'Eames\';');
question4ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Eames\' ORDER BY RANDOM() LIMIT 1;');
question4ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Eames\' ORDER BY RANDOM() LIMIT 1;');
question4ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Eames\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForInception.push(question4ForInception);
allQueriesForGeneral.push(question4ForInception);

var question5ForInception = [];
question5ForInception.push('Which actor plays the role of the character Saito in the movie Inception?');
question5ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character = \'Saito\';');
question5ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Saito\' ORDER BY RANDOM() LIMIT 1;');
question5ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Saito\' ORDER BY RANDOM() LIMIT 1;');
question5ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Saito\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForInception.push(question5ForInception);
allQueriesForGeneral.push(question5ForInception);

var question6ForInception = [];
question6ForInception.push('Which actor plays the role of the character Arthur in the movie Inception?');
question6ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character = \'Arthur\';');
question6ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Arthur\' ORDER BY RANDOM() LIMIT 1;');
question6ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Arthur\' ORDER BY RANDOM() LIMIT 1;');
question6ForInception.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Arthur\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForInception.push(question6ForInception);
allQueriesForGeneral.push(question6ForInception);

///// THE GODFATHER QUERIES ////

var question1ForTheGodFather = [];
question1ForTheGodFather.push('Which actor plays the role of the character Don Vito Corleone in The Godfather?');
question1ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character = \'Don Vito Corleone\';');
question1ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Don Vito Corleone\' ORDER BY RANDOM() LIMIT 1;');
question1ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Don Vito Corleone\' ORDER BY RANDOM() LIMIT 1;');
question1ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Don Vito Corleone\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTheGodFather.push(question1ForTheGodFather);
allQueriesForGeneral.push(question1ForTheGodFather);

var question2ForTheGodFather = [];
question2ForTheGodFather.push('Which actor plays the role of the character Michael Corleone in The Godfather?');
question2ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character = \'Michael Corleone\';');
question2ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Michael Corleone\' ORDER BY RANDOM() LIMIT 1;');
question2ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Michael Corleone\' ORDER BY RANDOM() LIMIT 1;');
question2ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Michael Corleone\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTheGodFather.push(question2ForTheGodFather);
allQueriesForGeneral.push(question2ForTheGodFather);

var question3ForTheGodFather = [];
question3ForTheGodFather.push('Which actor plays the role of the character Santino Sonny Corleone in The Godfather?');
question3ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character = \'Santino Sonny Corleone\';');
question3ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Santino Sonny Corleone\' ORDER BY RANDOM() LIMIT 1;');
question3ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Santino Sonny Corleone\' ORDER BY RANDOM() LIMIT 1;');
question3ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Santino Sonny Corleone\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTheGodFather.push(question3ForTheGodFather);
allQueriesForGeneral.push(question3ForTheGodFather);

var question4ForTheGodFather = [];
question4ForTheGodFather.push('Which actor plays the role of the character Pete Clemenza in The Godfather?');
question4ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character = \'Pete Clemenza\';');
question4ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Pete Clemenza\' ORDER BY RANDOM() LIMIT 1;');
question4ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Pete Clemenza\' ORDER BY RANDOM() LIMIT 1;');
question4ForTheGodFather.push('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Pete Clemenza\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTheGodFather.push(question4ForTheGodFather);
allQueriesForGeneral.push(question4ForTheGodFather);

var question5ForTheGodFather = [];
question5ForTheGodFather.push('Who is the director of the movie The Godfather?');
question5ForTheGodFather.push('Select p.name From movieinfo m, personinfo p Where m.title = \'The Godfather\' and m.directorid = p.personid;');
question5ForTheGodFather.push('Select p.name From movieinfo m, personinfo p Where m.title != \'The Godfather\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
question5ForTheGodFather.push('Select p.name From movieinfo m, personinfo p Where m.title != \'The Godfather\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
question5ForTheGodFather.push('Select p.name From movieinfo m, personinfo p Where m.title != \'The Godfather\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;');
allQueriesForTheGodFather.push(question5ForTheGodFather);
allQueriesForGeneral.push(question5ForTheGodFather);

var question6ForTheGodFather = [];
question6ForTheGodFather.push('When did the movie Inception release?');
question6ForTheGodFather.push('Select m.releasedate From movieinfo m Where m.title = \'The Godfather\';');
question6ForTheGodFather.push('Select m.releasedate From movieinfo m Where m.title != \'The Godfather\' ORDER BY RANDOM() LIMIT 1;');
question6ForTheGodFather.push('Select m.releasedate From movieinfo m Where m.title != \'The Godfather\' ORDER BY RANDOM() LIMIT 1;');
question6ForTheGodFather.push('Select m.releasedate From movieinfo m Where m.title != \'The Godfather\' ORDER BY RANDOM() LIMIT 1;');
allQueriesForTheGodFather.push(question6ForTheGodFather);
allQueriesForGeneral.push(question6ForTheGodFather);

//////////////////////////////////

function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function hello(req, res) {
	//NOTE the following
	//console.log(req.query.options1 + "!!!!");
    if (totalOptions.length != 0) {
        totalOptions = [];
        optionCollection = [];
        optionCollection2 = [];
    }
//    console.log("request " + req.query.test)
    var pg = require('pg');
    var connectionString = 'postgres://groupjjsr:groupjjsrpassword@groupjjsr.cup5jjaxtuqn.us-west-2.rds.amazonaws.com:5432/groupjjsr';
    var client = new pg.Client(connectionString);
    
    
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		
		console.log(allQueriesForTitanic[0][0]);
		client.query(allQueriesForTitanic[0][1], function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}			
			console.log(result.rows);
			optionCollection.push(result);
			client.query(allQueriesForTitanic[0][2], function(err, result) {
				if(err) {
					return console.error('error running query', err);
				}
				console.log(result.rows);
				optionCollection.push(result);
				client.query(allQueriesForTitanic[0][3], function(err, result) {
					if(err) {
						return console.error('error running query', err);
					}
					console.log(result.rows);
					optionCollection.push(result);
					client.query(allQueriesForTitanic[0][4], function(err, result) {
						if(err) {
							return console.error('error running query', err);
						}
						console.log(result.rows);
						optionCollection.push(result);
						totalOptions.push(optionCollection);
						

					console.log('I am pringting results of row 1');
					console.log(totalOptions[0][0].rows);
					console.log(totalOptions[0][1].rows);
					console.log(totalOptions[0][2].rows);
					console.log(totalOptions[0][3].rows);
					
					
					
					
					client.end();
					});
				});
			});
		});
	});
}
		
				
//		console.log(allQueriesForTitanic[1][0]);
//		client.query(allQueriesForTitanic[1][1], function(err, result) {
//			if(err) {
//				return console.error('error running query', err);
//			}			
////			console.log(result);
//			optionCollection.push(result);
//			client.query(allQueriesForTitanic[1][2], function(err, result) {
//				if(err) {
//					return console.error('error running query', err);
//				}
////				console.log(result);
//				optionCollection.push(result);
//				client.query(allQueriesForTitanic[1][3], function(err, result) {
//					if(err) {
//						return console.error('error running query', err);
//					}
////					console.log(result);
//					optionCollection.push(result);
//					client.query(allQueriesForTitanic[1][4], function(err, result) {
//						if(err) {
//							return console.error('error running query', err);
//						}
////						console.log(result);
//						optionCollection.push(result);
//						totalOptions.push(optionCollection);
//						
//						//to delete
////					console.log(totalOptions[0]);
//					console.log('I am pringting results of row 2');
//					console.log(totalOptions[2][0].rows);
//					console.log(totalOptions[2][1].rows);
//					console.log(totalOptions[2][2].rows);
//					console.log(totalOptions[2][3].rows);
//					client.end();
//					});
//				});
//			});
//		});
//		
//		console.log(allQueriesForTitanic[2][0]);
//		client.query(allQueriesForTitanic[2][1], function(err, result) {
//			if(err) {
//				return console.error('error running query', err);
//			}			
////			console.log(result);
//			optionCollection.push(result);
//			client.query(allQueriesForTitanic[2][2], function(err, result) {
//				if(err) {
//					return console.error('error running query', err);
//				}
////				console.log(result);
//				optionCollection.push(result);
//				client.query(allQueriesForTitanic[2][3], function(err, result) {
//					if(err) {
//						return console.error('error running query', err);
//					}
////					console.log(result);
//					optionCollection.push(result);
//					client.query(allQueriesForTitanic[2][4], function(err, result) {
//						if(err) {
//							return console.error('error running query', err);
//						}
////						console.log(result);
//						optionCollection.push(result);
//						totalOptions.push(optionCollection);
//						
//						//to delete
////					console.log(totalOptions[0]);
//					console.log('I am pringting results of row 3');
//					console.log(totalOptions[3][0].rows);
//					console.log(totalOptions[3][1].rows);
//					console.log(totalOptions[3][2].rows);
//					console.log(totalOptions[3][3].rows);
//					client.end();
//					});
//				});
//			});
//		});
//		
//		console.log(allQueriesForTitanic[3][0]);
//		client.query(allQueriesForTitanic[3][1], function(err, result) {
//			if(err) {
//				return console.error('error running query', err);
//			}			
////			console.log(result);
//			optionCollection.push(result);
//			client.query(allQueriesForTitanic[3][2], function(err, result) {
//				if(err) {
//					return console.error('error running query', err);
//				}
////				console.log(result);
//				optionCollection.push(result);
//				client.query(allQueriesForTitanic[3][3], function(err, result) {
//					if(err) {
//						return console.error('error running query', err);
//					}
////					console.log(result);
//					optionCollection.push(result);
//					client.query(allQueriesForTitanic[3][4], function(err, result) {
//						if(err) {
//							return console.error('error running query', err);
//						}
////						console.log(result);
//						optionCollection.push(result);
//						totalOptions.push(optionCollection);
//						
//						//to delete
////					console.log(totalOptions[0]);
//					console.log('I am pringting results of row 2');
//					console.log(totalOptions[4][0].rows);
//					console.log(totalOptions[4][1].rows);
//					console.log(totalOptions[4][2].rows);
//					console.log(totalOptions[4][3].rows);
//					client.end();
//					});
//				});
//			});
//		});
//		
//		
//		console.log(allQueriesForTitanic[4][0]);
//		client.query(allQueriesForTitanic[4][1], function(err, result) {
//			if(err) {
//				return console.error('error running query', err);
//			}			
////			console.log(result);
//			optionCollection.push(result);
//			client.query(allQueriesForTitanic[4][2], function(err, result) {
//				if(err) {
//					return console.error('error running query', err);
//				}
////				console.log(result);
//				optionCollection.push(result);
//				client.query(allQueriesForTitanic[4][3], function(err, result) {
//					if(err) {
//						return console.error('error running query', err);
//					}
////					console.log(result);
//					optionCollection.push(result);
//					client.query(allQueriesForTitanic[4][4], function(err, result) {
//						if(err) {
//							return console.error('error running query', err);
//						}
////						console.log(result);
//						optionCollection.push(result);
//						totalOptions.push(optionCollection);
//						
//						//to delete
////					console.log(totalOptions[0]);
//					console.log('I am pringting results of row 2');
//					console.log(totalOptions[5][0].rows);
//					console.log(totalOptions[5][1].rows);
//					console.log(totalOptions[5][2].rows);
//					console.log(totalOptions[5][3].rows);
//					client.end();
//					});
//				});
//			});
//		});
	


module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/game', function(req, res) {
    	hello(req, res);
    	// TODO game.js must be invoked first
    	
    });

    
    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('loginPage.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    
    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // app.post('/signup', do all our passport stuff here);
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    
    
    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
    // =====================================
    // FACEBOOK ROUTES =====================
    // =====================================
    // route for facebook authentication and login
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

    // handle the callback after facebook has authenticated the user
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}