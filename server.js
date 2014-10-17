var bodyParser = require('body-parser')
  , express = require('express')
  , hbs = require('hbs')
  , mongoose = require('mongoose')
  , mdblurb = require('mdblurb')
  ;

var app = express();
app.set('view engine', 'html');
app.engine('html', hbs.__express);

mongoose.connect('mongodb://localhost/sandbox_dev');

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

mdblurb.registerApp(app, {
	connectionString: 'mongodb://localhost/sandbox_dev',
	auth: function(req, res, next){
		req.canEditBlurb = true;
		next();
	}
});

app.get('/', function(req, res){
	res.send('it works!');
});

app.get('/about', function(req, res){
	res.render('about')
})

console.log('Listening on port 3000')
app.listen(3000)