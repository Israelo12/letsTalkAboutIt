var path = require('path');
var db = require('../models')

module.exports = function (app) {
	// Load index page
	app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
	});

	app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signUp.html"));
	});

	app.get("/dashboard/:id", function(req,res){
		
		db.User.findOne({
			where: {
				id:req.params.id
			}
		}).then(function(dbUser){
			console.log(req.session.authenticate)
			if (req.session.authenticated = true){

				console.log(dbUser)
				res.render("example", {user: dbUser})
			}
			else {
				console.log('No access!')
			}
		})
	})

	// // Load example page and pass in an example by id
	// app.get('/login', function (req, res) {
	// 	db.Example.findOne({ where: { id: req.params.id } }).then(function (dbExample) {
	// 		res.render('example', {
	// 			example: dbExample
	// 		});
	// 	});
	// });

	// Render 404 page for any unmatched routes
	app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/login.html"));
  });
};
