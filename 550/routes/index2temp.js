var express = require('express');
var router = express.Router();

module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    app.get('/game', function(req, res) {
        titanicGame(req, res);
        // TODO game.js must be invoked first
        //res.render('game.ejs', { message: req.flash('gameMessage'), totalOptions: totalOptions}); 
        
    });

    app.get('/titanic', function(req, res) {
        titanicGame(req, res);
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







//####################################################################################################
//
//                                          TITANIC GAME STUFF
//
//####################################################################################################

var pg = require('pg');
var connectionString = 'postgres://groupjjsr:groupjjsrpassword@groupjjsr.cup5jjaxtuqn.us-west-2.rds.amazonaws.com:5432/groupjjsr';
var client = new pg.Client(connectionString);

function populateQueryResults(client, dbQueryList, queryResultVariableList) {
    client.connect(function(err) {
        if(err) return console.error('could not connect to postgres', err);
        seriallyExecuteQueries(client, dbQueryList, queryResultVariableList);
    });
}


function seriallyExecuteQueries (client, dbQueryList, queryResultVariableList) {
    if (dbQueryList.length == 0) {
        client.end();
        return;
    }

    dbQuery = dbQueryList.shift(); //get first element of dbQueryList
    queryResultVariable = queryResultVariableList.shift();

    client.query(dbQuery, function(err, result) {
            if(err) return console.error('error running query', err);
            queryResultVariable["text"] = result.rows[0].name;
            seriallyExecuteQueries(client, dbQueryList, queryResultVariableList);
        });
}


var currentQuestion = -1;
var currentScore = 0;
var currentOptions = [];
var currentQuestionText = ""
var unusedQuestionNumbers = [0,1]; //TODO: make this NOT hardcoded (should be equal to the number of questions the current game has)
var newGame = true;

var queryList = [];
var resultVariableList = []; //list of **variables** where results of corresponding queries in queryList will be stored

var titanic = [];


//************* START: Code for Titanic Q0 **************
var titanic_q0 = {};
titanic_q0["question"] = {"text": 'Which of the following actors played a role in the movie Titanic?'};

titanic_q0["right_ans"] = {"query":'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and m.tagline = \'Nothing on Earth could come between them.\' ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q0["right_ans"]["query"]);
resultVariableList.push(titanic_q0["right_ans"]);

titanic_q0["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(titanic_q0["all_wrong_ans"]["query"]);
resultVariableList.push(titanic_q0["all_wrong_ans"]);

//titanic_q0["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q0["wrong_ans1"]["query"]);
//resultVariableList.push(titanic_q0["wrong_ans1"]);
//
//titanic_q0["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q0["wrong_ans2"]["query"]);
//resultVariableList.push(titanic_q0["wrong_ans2"]);
//
//titanic_q0["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q0["wrong_ans3"]["query"]);
//resultVariableList.push(titanic_q0["wrong_ans3"]);

titanic_q0["movie"] = "Titanic"; //for Bing search

titanic.push(titanic_q0);
//************* END: Code for Titanic Q0 **************

//************* START: Code for Titanic Q1 **************
var titanic_q1 = {};
titanic_q1["question"] = {"text": 'Who is the director of the movie Titanic?'};

titanic_q1["right_ans"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title = \'Titanic\' and m.directorid = p.personid and m.tagline = \'Nothing on Earth could come between them.\';'};
queryList.push(titanic_q1["right_ans"]["query"]);
resultVariableList.push(titanic_q1["right_ans"]);

titanic_q1["all_wrong_ans"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(titanic_q1["all_wrong_ans"]["query"]);
resultVariableList.push(titanic_q1["all_wrong_ans"]);

//titanic_q1["wrong_ans1"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q1["wrong_ans1"]["query"]);
//resultVariableList.push(titanic_q1["wrong_ans1"]);
//
//titanic_q1["wrong_ans2"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q1["wrong_ans2"]["query"]);
//resultVariableList.push(titanic_q1["wrong_ans2"]);
//
//titanic_q1["wrong_ans3"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q1["wrong_ans3"]["query"]);
//resultVariableList.push(titanic_q1["wrong_ans3"]);

titanic_q1["movie"] = "Titanic"; //for Bing search

titanic.push(titanic_q1);
//************* END: Code for Titanic Q1 **************

//************* START: Code for Titanic Q2 **************
var titanic_q2 = {};
titanic_q2["question"] = {"text": 'When did the movie Titanic release?'};

titanic_q2["right_ans"] = {"query": 'Select m.releasedate From movieinfo m Where m.title = \'Titanic\' and m.tagline = \'Nothing on Earth could come between them.\';'};
queryList.push(titanic_q2["right_ans"]["query"]);
resultVariableList.push(titanic_q2["right_ans"]);

titanic_q2["all_wrong_ans"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(titanic_q2["all_wrong_ans"]["query"]);
resultVariableList.push(titanic_q2["all_wrong_ans"]);

//titanic_q2["wrong_ans1"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q2["wrong_ans1"]["query"]);
//resultVariableList.push(titanic_q2["wrong_ans1"]);
//
//titanic_q2["wrong_ans2"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q2["wrong_ans2"]["query"]);
//resultVariableList.push(titanic_q2["wrong_ans2"]);
//
//titanic_q2["wrong_ans3"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q2["wrong_ans3"]["query"]);
//resultVariableList.push(titanic_q2["wrong_ans3"]);

titanic_q2["movie"] = "Titanic"; //for Bing search

titanic.push(titanic_q2);
//************* END: Code for Titanic Q2 **************

//************* START: Code for Titanic Q3 **************
var titanic_q3 = {};
titanic_q3["question"] = {"text": 'Which actor plays the role of the character of Old Rose in Titanic?'};

titanic_q3["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character = \'Old Rose\';'};
queryList.push(titanic_q3["right_ans"]["query"]);
resultVariableList.push(titanic_q3["right_ans"]);

titanic_q3["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Old Rose\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(titanic_q3["all_wrong_ans"]["query"]);
resultVariableList.push(titanic_q3["all_wrong_ans"]);

//titanic_q3["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Old Rose\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q3["wrong_ans1"]["query"]);
//resultVariableList.push(titanic_q3["wrong_ans1"]);
//
//titanic_q3["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Old Rose\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q3["wrong_ans2"]["query"]);
//resultVariableList.push(titanic_q3["wrong_ans2"]);
//
//titanic_q3["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Old Rose\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(titanic_q3["wrong_ans3"]["query"]);
//resultVariableList.push(titanic_q3["wrong_ans3"]);

titanic_q3["movie"] = "Titanic"; //for Bing search

titanic.push(titanic_q3);
//************* END: Code for Titanic Q3 **************

//************* START: Code for Titanic Q4 **************
var titanic_q4 = {};
titanic_q4["question"] = {"text": 'Which actor plays the role of the character Caledon Cal Hockley in the movie Titanic?'};

titanic_q4["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character = \'Caledon Cal Hockley\';'};
queryList.push(titanic_q4["right_ans"]["query"]);
resultVariableList.push(titanic_q4["right_ans"]);

titanic_q4["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Caledon Cal Hockley\' ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q4["wrong_ans1"]["query"]);
resultVariableList.push(titanic_q4["wrong_ans1"]);

titanic_q4["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Caledon Cal Hockley\' ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q4["wrong_ans2"]["query"]);
resultVariableList.push(titanic_q4["wrong_ans2"]);

titanic_q4["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Titanic\' and r.character != \'Caledon Cal Hockley\' ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q4["wrong_ans3"]["query"]);
resultVariableList.push(titanic_q4["wrong_ans3"]);

titanic_q4["movie"] = "Titanic"; //for Bing search

titanic.push(titanic_q4);
//************* END: Code for Titanic Q4 **************

//************* START: Code for Inception Q0 **************
var inception_q0 = {};
inception_q0["question"] = {"text": 'Which of the following actors played a role in the movie Inception?'};

inception_q0["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' ORDER BY RANDOM() LIMIT 1;'};
queryList.push(inception_q0["right_ans"]["query"]);
resultVariableList.push(inception_q0["right_ans"]);

inception_q0["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Inception\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(inception_q0["all_wrong_ans"]["query"]);
resultVariableList.push(inception_q0["all_wrong_ans"]);

//inception_q0["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q0["wrong_ans1"]["query"]);
//resultVariableList.push(inception_q0["wrong_ans1"]);
//
//inception_q0["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q0["wrong_ans2"]["query"]);
//resultVariableList.push(inception_q0["wrong_ans2"]);
//
//inception_q0["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q0["wrong_ans3"]["query"]);
//resultVariableList.push(inception_q0["wrong_ans3"]);

inception_q0["movie"] = "Inception"; //for Bing search

titanic.push(inception_q0);
//************* END: Code for Inception Q0 **************

//************* START: Code for Inception Q1 **************
var inception_q1 = {};
inception_q1["question"] = {"text": 'Who is the director of the movie Inception?'};

inception_q1["right_ans"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title = \'Inception\' and m.directorid = p.personid;'};
queryList.push(inception_q1["right_ans"]["query"]);
resultVariableList.push(inception_q1["right_ans"]);

inception_q1["all_wrong_ans"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Inception\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(inception_q1["all_wrong_ans"]["query"]);
resultVariableList.push(inception_q1["all_wrong_ans"]);

//inception_q1["wrong_ans1"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Inception\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q1["wrong_ans1"]["query"]);
//resultVariableList.push(inception_q1["wrong_ans1"]);
//
//inception_q1["wrong_ans2"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Inception\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q1["wrong_ans2"]["query"]);
//resultVariableList.push(inception_q1["wrong_ans2"]);
//
//inception_q1["wrong_ans3"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Inception\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q1["wrong_ans3"]["query"]);
//resultVariableList.push(inception_q1["wrong_ans3"]);

inception_q1["movie"] = "Inception"; //for Bing search

titanic.push(inception_q1);
//************* END: Code for Inception Q1 **************

//************* START: Code for Inception Q2 **************
var inception_q2 = {};
inception_q2["question"] = {"text": 'When did the movie Inception release?'};

inception_q2["right_ans"] = {"query": 'Select m.releasedate From movieinfo m Where m.title = \'Inception\';'};
queryList.push(inception_q2["right_ans"]["query"]);
resultVariableList.push(inception_q2["right_ans"]);

inception_q2["all_wrong_ans"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'Inception\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(inception_q2["all_wrong_ans"]["query"]);
resultVariableList.push(inception_q2["all_wrong_ans"]);

//inception_q2["wrong_ans1"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q2["wrong_ans1"]["query"]);
//resultVariableList.push(inception_q2["wrong_ans1"]);
//
//inception_q2["wrong_ans2"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q2["wrong_ans2"]["query"]);
//resultVariableList.push(inception_q2["wrong_ans2"]);
//
//inception_q2["wrong_ans3"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'Inception\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q2["wrong_ans3"]["query"]);
//resultVariableList.push(inception_q2["wrong_ans3"]);

inception_q2["movie"] = "Inception"; //for Bing search

titanic.push(inception_q2);
//************* END: Code for Inception Q2 **************

//************* START: Code for Inception Q3 **************
var inception_q3 = {};
inception_q3["question"] = {"text": 'Which actor plays the role of the character Eames in the movie Inception?'};

inception_q3["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character = \'Eames\';'};
queryList.push(inception_q3["right_ans"]["query"]);
resultVariableList.push(inception_q3["right_ans"]);

inception_q3["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Eames\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(inception_q3["all_wrong_ans"]["query"]);
resultVariableList.push(inception_q3["all_wrong_ans"]);

//inception_q3["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Eames\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q3["wrong_ans1"]["query"]);
//resultVariableList.push(inception_q3["wrong_ans1"]);
//
//inception_q3["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Eames\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q3["wrong_ans2"]["query"]);
//resultVariableList.push(inception_q3["wrong_ans2"]);
//
//inception_q3["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Eames\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q3["wrong_ans3"]["query"]);
//resultVariableList.push(inception_q3["wrong_ans3"]);

inception_q3["movie"] = "Inception"; //for Bing search

titanic.push(inception_q3);
//************* END: Code for Inception Q3 **************

//************* START: Code for Inception Q4 **************
var inception_q4 = {};
inception_q4["question"] = {"text": 'Which actor plays the role of the character Saito in the movie Inception?'};

inception_q4["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character = \'Saito\';'};
queryList.push(inception_q4["right_ans"]["query"]);
resultVariableList.push(inception_q4["right_ans"]);

inception_q4["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Saito\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(inception_q4["all_wrong_ans"]["query"]);
resultVariableList.push(inception_q4["all_wrong_ans"]);

//inception_q4["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Saito\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q4["wrong_ans1"]["query"]);
//resultVariableList.push(inception_q4["wrong_ans1"]);
//
//inception_q4["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Saito\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q4["wrong_ans2"]["query"]);
//resultVariableList.push(inception_q4["wrong_ans2"]);
//
//inception_q4["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Saito\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q4["wrong_ans3"]["query"]);
//resultVariableList.push(inception_q4["wrong_ans3"]);

inception_q4["movie"] = "Inception"; //for Bing search

titanic.push(inception_q4);
//************* END: Code for Inception Q4 **************

//************* START: Code for Inception Q5 **************
var inception_q5 = {};
inception_q5["question"] = {"text": 'Which actor plays the role of the character Arthur in the movie Inception?'};

inception_q5["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character = \'Arthur\';'};
queryList.push(inception_q5["right_ans"]["query"]);
resultVariableList.push(inception_q5["right_ans"]);

inception_q5["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Arthur\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(inception_q5["all_wrong_ans"]["query"]);
resultVariableList.push(inception_q5["all_wrong_ans"]);

//inception_q5["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Arthur\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q5["wrong_ans1"]["query"]);
//resultVariableList.push(inception_q5["wrong_ans1"]);
//
//inception_q5["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Arthur\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q5["wrong_ans2"]["query"]);
//resultVariableList.push(inception_q5["wrong_ans2"]);
//
//inception_q5["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'Inception\' and r.character != \'Arthur\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(inception_q5["wrong_ans3"]["query"]);
//resultVariableList.push(inception_q5["wrong_ans3"]);

inception_q5["movie"] = "Inception"; //for Bing search

titanic.push(inception_q5);
//************* END: Code for Inception Q5 **************

//************* START: Code for Godfather Q0 **************
var godfather_q0 = {};
godfather_q0["question"] = {"text": 'Which actor plays the role of the character Don Vito Corleone in The Godfather?'};

godfather_q0["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character = \'Don Vito Corleone\';'};
queryList.push(godfather_q0["right_ans"]["query"]);
resultVariableList.push(godfather_q0["right_ans"]);

godfather_q0["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Don Vito Corleone\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(godfather_q0["all_wrong_ans"]["query"]);
resultVariableList.push(godfather_q0["all_wrong_ans"]);

//godfather_q0["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Don Vito Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q0["wrong_ans1"]["query"]);
//resultVariableList.push(godfather_q0["wrong_ans1"]);
//
//godfather_q0["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Don Vito Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q0["wrong_ans2"]["query"]);
//resultVariableList.push(godfather_q0["wrong_ans2"]);
//
//godfather_q0["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Don Vito Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q0["wrong_ans3"]["query"]);
//resultVariableList.push(godfather_q0["wrong_ans3"]);

godfather_q0["movie"] = "Godfather"; //for Bing search

titanic.push(godfather_q0);
//************* END: Code for Godfather Q0 **************

//************* START: Code for Godfather Q1 **************
var godfather_q1 = {};
godfather_q1["question"] = {"text": 'Which actor plays the role of the character Michael Corleone in The Godfather?'};

godfather_q1["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character = \'Michael Corleone\';'};
queryList.push(godfather_q1["right_ans"]["query"]);
resultVariableList.push(godfather_q1["right_ans"]);

godfather_q1["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Michael Corleone\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(godfather_q1["all_wrong_ans"]["query"]);
resultVariableList.push(godfather_q1["all_wrong_ans"]);

//godfather_q1["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Michael Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q1["wrong_ans1"]["query"]);
//resultVariableList.push(godfather_q1["wrong_ans1"]);
//
//godfather_q1["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Michael Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q1["wrong_ans2"]["query"]);
//resultVariableList.push(godfather_q1["wrong_ans2"]);
//
//godfather_q1["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Michael Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q1["wrong_ans3"]["query"]);
//resultVariableList.push(godfather_q1["wrong_ans3"]);

godfather_q1["movie"] = "Godfather"; //for Bing search

titanic.push(godfather_q1);
//************* END: Code for Godfather Q1 **************

//************* START: Code for Godfather Q2 **************
var godfather_q2 = {};
godfather_q2["question"] = {"text": 'Which actor plays the role of the character Santino Sonny Corleone in The Godfather?'};

godfather_q2["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character = \'Santino Sonny Corleone\';'};
queryList.push(godfather_q2["right_ans"]["query"]);
resultVariableList.push(godfather_q2["right_ans"]);

godfather_q2["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Santino Sonny Corleone\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(godfather_q2["all_wrong_ans"]["query"]);
resultVariableList.push(godfather_q2["all_wrong_ans"]);

//godfather_q2["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Santino Sonny Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q2["wrong_ans1"]["query"]);
//resultVariableList.push(godfather_q2["wrong_ans1"]);
//
//godfather_q2["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Santino Sonny Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q2["wrong_ans2"]["query"]);
//resultVariableList.push(godfather_q2["wrong_ans2"]);
//
//godfather_q2["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Santino Sonny Corleone\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q2["wrong_ans3"]["query"]);
//resultVariableList.push(godfather_q2["wrong_ans3"]);

godfather_q2["movie"] = "Godfather"; //for Bing search

titanic.push(godfather_q2);
//************* END: Code for Godfather Q2 **************

//************* START: Code for Godfather Q3 **************
var godfather_q3 = {};
godfather_q3["question"] = {"text": 'Which actor plays the role of the character Pete Clemenza in The Godfather?'};

godfather_q3["right_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character = \'Pete Clemenza\';'};
queryList.push(godfather_q3["right_ans"]["query"]);
resultVariableList.push(godfather_q3["right_ans"]);

godfather_q3["all_wrong_ans"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Pete Clemenza\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(godfather_q3["all_wrong_ans"]["query"]);
resultVariableList.push(godfather_q3["all_wrong_ans"]);

//godfather_q3["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Pete Clemenza\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q3["wrong_ans1"]["query"]);
//resultVariableList.push(godfather_q3["wrong_ans1"]);
//
//godfather_q3["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Pete Clemenza\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q3["wrong_ans2"]["query"]);
//resultVariableList.push(godfather_q3["wrong_ans2"]);
//
//godfather_q3["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title = \'The Godfather\' and r.character != \'Pete Clemenza\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q3["wrong_ans3"]["query"]);
//resultVariableList.push(godfather_q3["wrong_ans3"]);

godfather_q3["movie"] = "Godfather"; //for Bing search

titanic.push(godfather_q3);
//************* END: Code for Godfather Q3 **************

//************* START: Code for Godfather Q4 **************
var godfather_q4 = {};
godfather_q4["question"] = {"text": 'Who is the director of the movie The Godfather?'};

godfather_q4["right_ans"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title = \'The Godfather\' and m.directorid = p.personid;'};
queryList.push(godfather_q4["right_ans"]["query"]);
resultVariableList.push(godfather_q4["right_ans"]);

godfather_q4["all_wrong_ans"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'The Godfather\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(godfather_q4["all_wrong_ans"]["query"]);
resultVariableList.push(godfather_q4["all_wrong_ans"]);

//godfather_q4["wrong_ans1"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'The Godfather\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q4["wrong_ans1"]["query"]);
//resultVariableList.push(godfather_q4["wrong_ans1"]);
//
//godfather_q4["wrong_ans2"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'The Godfather\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q4["wrong_ans2"]["query"]);
//resultVariableList.push(godfather_q4["wrong_ans2"]);
//
//godfather_q4["wrong_ans3"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'The Godfather\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q4["wrong_ans3"]["query"]);
//resultVariableList.push(godfather_q4["wrong_ans3"]);

godfather_q4["movie"] = "Godfather"; //for Bing search

titanic.push(godfather_q4);
//************* END: Code for Godfather Q4 **************

//************* START: Code for Godfather Q5 **************
var godfather_q5 = {};
godfather_q5["question"] = {"text": 'When did the movie Inception release?'};

godfather_q5["right_ans"] = {"query": 'Select m.releasedate From movieinfo m Where m.title = \'The Godfather\';'};
queryList.push(godfather_q5["right_ans"]["query"]);
resultVariableList.push(godfather_q5["right_ans"]);

godfather_q5["all_wrong_ans"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'The Godfather\' ORDER BY RANDOM() LIMIT 3;'}; 
queryList.push(godfather_q5["all_wrong_ans"]["query"]);
resultVariableList.push(godfather_q5["all_wrong_ans"]);

//godfather_q5["wrong_ans1"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'The Godfather\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q5["wrong_ans1"]["query"]);
//resultVariableList.push(godfather_q5["wrong_ans1"]);
//
//godfather_q5["wrong_ans2"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'The Godfather\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q5["wrong_ans2"]["query"]);
//resultVariableList.push(godfather_q5["wrong_ans2"]);
//
//godfather_q5["wrong_ans3"] = {"query": 'Select m.releasedate From movieinfo m Where m.title != \'The Godfather\' ORDER BY RANDOM() LIMIT 1;'};
//queryList.push(godfather_q5["wrong_ans3"]["query"]);
//resultVariableList.push(godfather_q5["wrong_ans3"]);

godfather_q5["movie"] = "Godfather"; //for Bing search

titanic.push(godfather_q5);
//************* END: Code for Godfather Q5 **************

//after ALL questions have been written out like Titanic Q0 above, run the next line
populateQueryResults(client, queryList, resultVariableList);



function getRandomizedOptionList (questionNumber) {
	
	
    optionList = [];
    optionList.push(titanic[questionNumber]["wrong_ans1"]["text"]);
    optionList.push(titanic[questionNumber]["wrong_ans2"]["text"]);
    optionList.push(titanic[questionNumber]["wrong_ans3"]["text"]);
    var rightAnswerOptionNumber = Math.floor((Math.random() * 4)); //random int between 0 (incl.) and 3 (incl.)
    optionList.splice(rightAnswerOptionNumber, 0, titanic[questionNumber]["right_ans"]["text"]);
    titanic[questionNumber]["right_ans"]["optionNumber"] = rightAnswerOptionNumber;
    titanic[questionNumber]["randomizedOptionList"] = optionList;

    console.log("Options are: " + optionList);
    console.log("Correct Answer is: " + optionList[rightAnswerOptionNumber]);
    return optionList;
}


//returns 1 if the User selected the right option for this question. 0 otherwise
function processUserAnswer (questionNumber, req, res) {
    if (Object.keys(req.query).length == 0) return; //user has given no answer (eg: when first question loads)
    userSelection = -1;
    if (req.query["0"] == "on") userSelection = 0;
    else if (req.query["1"] == "on") userSelection = 1;
    else if (req.query["2"] == "on") userSelection = 2;
    else if (req.query["3"] == "on") userSelection = 3;

    //TODO: test
    console.log("User Selection Option Number: "+userSelection);

    unusedQuestionNumbers.splice(unusedQuestionNumbers.indexOf(questionNumber), 1); //remove this question from the list of unused questions
    if (userSelection == titanic[questionNumber]["right_ans"]["optionNumber"]) return 1;
    else return 0;
}

function displayQuestion (questionNumber, req, res) {
    currentQuestionText = titanic[questionNumber]["question"]["text"];
    currentOptions = getRandomizedOptionList(questionNumber);
    res.render('game.ejs', { message: req.flash('gameMessage'), currentOptions: currentOptions, currentQuestionText: currentQuestionText});
}

function titanicGame (req, res) {
    
    if (!newGame) currentScore += processUserAnswer(currentQuestion, req, res); //no need to process answers for new game
    newGame = false;

    if (unusedQuestionNumbers.length == 0) { //end of game
        var finalScore = currentScore;
        console.log("YOUR SCORE: " + finalScore + "/" + titanic.length);
        //game Over

        currentQuestion = -1;
        currentScore = 0;
        currentOptions = [];
        currentQuestionText = ""
        unusedQuestionNumbers = [0,1]; //TODO make this NOT hardcoded. Should be equal to the number of questions each game has
        newGame = true;

        res.render('score.ejs', {finalScore: finalScore});
        return;
    }
    currentQuestion = unusedQuestionNumbers[Math.floor((Math.random() * unusedQuestionNumbers.length))];
    displayQuestion(currentQuestion, req, res);
}



