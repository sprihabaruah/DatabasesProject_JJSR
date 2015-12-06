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

    app.get('/checkAnswer', function(req, res) {
        processUserAnswer(req, res);
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

titanic_q0["wrong_ans1"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q0["wrong_ans1"]["query"]);
resultVariableList.push(titanic_q0["wrong_ans1"]);

titanic_q0["wrong_ans2"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q0["wrong_ans2"]["query"]);
resultVariableList.push(titanic_q0["wrong_ans2"]);

titanic_q0["wrong_ans3"] = {"query": 'SELECT p.name FROM personinfo p INNER JOIN roles r ON p.personId = r.personID INNER JOIN movieinfo m ON m.movieId = r.movieId WHERE m.title != \'Titanic\' ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q0["wrong_ans3"]["query"]);
resultVariableList.push(titanic_q0["wrong_ans3"]);

titanic_q0["movie"] = "Titanic"; //for Bing search

titanic.push(titanic_q0);
//************* END: Code for Titanic Q0 **************

//************* START: Code for Titanic Q1 **************
var titanic_q1 = {};
titanic_q1["question"] = {"text": 'Who is the director of the movie Titanic?'};

titanic_q1["right_ans"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title = \'Titanic\' and m.directorid = p.personid and m.tagline = \'Nothing on Earth could come between them.\';'};
queryList.push(titanic_q1["right_ans"]["query"]);
resultVariableList.push(titanic_q1["right_ans"]);

titanic_q1["wrong_ans1"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q1["wrong_ans1"]["query"]);
resultVariableList.push(titanic_q1["wrong_ans1"]);

titanic_q1["wrong_ans2"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q1["wrong_ans2"]["query"]);
resultVariableList.push(titanic_q1["wrong_ans2"]);

titanic_q1["wrong_ans3"] = {"query": 'Select p.name From movieinfo m, personinfo p Where m.title != \'Titanic\' and m.directorid = p.personid ORDER BY RANDOM() LIMIT 1;'};
queryList.push(titanic_q1["wrong_ans3"]["query"]);
resultVariableList.push(titanic_q1["wrong_ans3"]);

titanic_q1["movie"] = "Titanic"; //for Bing search

titanic.push(titanic_q1);
//************* END: Code for Titanic Q1 **************




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
function processUserAnswer (req, res) {
    //if (Object.keys(req.query).length == 0) return; //user has given no answer (eg: when first question loads)
    userSelection = req.query.userSelection;
    questionNumber = req.query.questionNumber;
    var correctAnswerText = titanic[questionNumber]["right_ans"]["text"];
    //TODO: test
    console.log("User Selection Option Number: "+userSelection);

    unusedQuestionNumbers.splice(unusedQuestionNumbers.indexOf(questionNumber), 1); //remove this question from the list of unused questions
    if (userSelection == titanic[questionNumber]["right_ans"]["optionNumber"]) {
        currentScore += 1;
        res.render('rightAnswer.ejs', {correctAnswerText : correctAnswerText});
        return;
    }
    else {
        res.render('wrongAnswer.ejs', {correctAnswerText : correctAnswerText});
        return 0;
    }
}

function displayQuestion (questionNumber, req, res) {
    currentQuestionText = titanic[questionNumber]["question"]["text"];
    currentOptions = getRandomizedOptionList(questionNumber);
    res.render('game.ejs', { message: req.flash('gameMessage'), currentOptions: currentOptions, currentQuestionText: currentQuestionText, questionNumber: questionNumber});
}

function titanicGame (req, res) {
    
    //if (!newGame) currentScore += processUserAnswer(currentQuestion, req, res); //no need to process answers for new game
    //newGame = false;

    if (unusedQuestionNumbers.length == 0) { //end of game
        var finalScore = currentScore;
        console.log("YOUR SCORE: " + finalScore + "/" + titanic.length);
        //game Over

        currentQuestion = -1;
        currentScore = 0;
        currentOptions = [];
        currentQuestionText = ""
        unusedQuestionNumbers = [0,1]; //TODO make this NOT hardcoded. Should be equal to the number of questions each game has

        //push final score to this user's profile
        res.render('score.ejs', {finalScore: finalScore});
        return;
    }
    currentQuestion = unusedQuestionNumbers[Math.floor((Math.random() * unusedQuestionNumbers.length))];
    displayQuestion(currentQuestion, req, res);
}


