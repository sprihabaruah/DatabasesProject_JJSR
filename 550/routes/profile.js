module.exports = function(app, passport) {



    // =====================================
    // Game ===============================
    // =====================================
    // show the game page
	
    app.get('/game', function(req, res) {
    	
    	
        // render the page and pass in any flash data if it exists
        res.render('game.ejs', { message: req.flash('gameMessage') }); 
    });

};