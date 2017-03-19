var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');
var path     = require('path');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'resources/static/dist/')));

var port     = process.env.PORT || 8080; 
var mongoose   = require('mongoose');
mongoose.connect('mongodb://prithviraju1369:prithviraju1369@ds135690.mlab.com:35690/capillary'); 
var Capillary     = require('./app/models/capillary-doc');

var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next();
});

router.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
	res.json({ message: 'welcome to Games Arena!' });	
});

//http://localhost:8080/api/getGames/<search_string>?pageNo=1&noOfRows=1&sortBy=title&sortOrder=ascending
router.route('/getGames')
	.get(function(req, res) {
		console.log("Getting games: " + req.query.pageNo);
		var pageNo = parseInt(req.query.pageNo);
		var noOfRows = parseInt(req.query.noOfRows);
		var sortBy = req.query.sortBy;
		var sortOrder = req.query.sortOrder;

		Capillary.find(function(err, games) {
			if (err)
				res.send(err);

			res.json(games);
		})
		.limit(noOfRows)
		.skip(noOfRows * (pageNo-1))
		.sort([[sortBy, sortOrder]]);
	});
router.route('/count')
	.get(function(req, res) {
		Capillary.count(function(err, count) {
			if (err)
				res.send(err);

			res.json(count);
			console.log("games count: " + count);
		});
	});

router.route('/getGames/:gameName')
	.get(function(req, res) {
		var pageNo = parseInt(req.query.pageNo);
		var noOfRows = parseInt(req.query.noOfRows); 
		var sortBy = req.query.sortBy;
		var sortOrder = req.query.sortOrder;
		Capillary.find({title: {"$regex": req.params.gameName, "$options": "i"} }, function(err, game) {
			if (err)
				res.send(err);
			res.json(game);
		}).limit(noOfRows)
		.skip(noOfRows * (pageNo-1))
		.sort([[sortBy, sortOrder]]);
	});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api', router);

// START THE SERVER
app.listen(port);
console.log('Games Arena Started on  ' + port);
