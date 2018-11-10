require('dotenv').config();
var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
let config = require('./config.js')
const bodyParser = require('body-parser');

var db = require('./models');

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
	secret: config.secret,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(express.static('public'));
// Handlebars
app.engine(
	'handlebars',
	exphbs({
		defaultLayout: 'main'
	})
);
app.set('view engine', 'handlebars');

// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
	syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
	app.listen(PORT, function () {
		console.log(
			'==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.',
			PORT,
			PORT
		);
	});
});

module.exports = app;