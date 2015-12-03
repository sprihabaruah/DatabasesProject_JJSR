var express = require('express');
var router = express.Router();

// router.get('/game', function(req, res, next) {
//     res.render('game.ejs', {result: totalOptions});
// });
var totalOptions = [];
var optionCollection = [];
var optionCollection2 = [];

function hello(req, res) {
    if (totalOptions.length != 0) {
        totalOptions = [];
        optionCollection = [];
        optionCollection2 = [];
    }
    console.log("request " + req.query.test)
    var pg = require('pg');
    var connectionString = 'postgres://groupjjsr:groupjjsrpassword@groupjjsr.cup5jjaxtuqn.us-west-2.rds.amazonaws.com:5432/groupjjsr';
    var client = new pg.Client(connectionString);
    
    
	client.connect(function(err) {
		if(err) {
			return console.error('could not connect to postgres', err);
		}
		
		client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'300\';', function(err, result) {
			if(err) {
				return console.error('error running query', err);
			}
			// retrieving the first out of the first 10 queries. 
//			console.log(result);
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
						totalOptions.push(optionCollection);
						
						//to delete
						console.log(totalOptions);
					});
				});
			});
		});
		
		

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
//          res.render('login.ejs', {result: result});
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
//              res.render('login.ejs', {result: result});
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
//                  res.render('login.ejs', {result: result});
                    // client.end();
                    client.query('SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Bourne Identity\';', function(err, result) {
                        if(err) {
                            return console.error('error running query', err);
                        }
                        // retrieving the first out of the first 10 queries. 
                        // // console.log(result.rowCount);
//                      console.log(result.rows[0].name)
                        var randomIndex = (Math.floor(Math.random() * (result.rowCount - 0) + 0));
                        // console.log("TESTING" + result.rows[randomIndex]);
                        
                        result = result.rows[randomIndex];
                        optionCollection2.push(result);
                        
                        totalOptions.push(optionCollection2);
                        //res.render('game.ejs', {totalOptions: totalOptions});       
                        
                        client.end();
                        
                        
                        //to delete
                        console.log(totalOptions);

                        if (totalOptions.length == 0) {
                            fakeOptions = ["test1", "test2", "test3", "test4"];
                            totalOptions.push(fakeOptions);
                        }

                        // render the page and pass in any flash data if it exists
                        res.render('game.ejs', { message: req.flash('gameMessage'), totalOptions: totalOptions}); 
                    });
                });
            });
        });
		
        
        
        
        
        
//      console.log(optionCollection2[0])
        
//      console.log(totalOptions[0])
        
    });
}


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
};


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}