
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , request = require("request")
  , http = require('http');

var app = express();

app.configure(function(){
  app.set('secretKey', 'yoursecretkey');
  app.set('cookieSessionKey', 'yourcookiesessionkey');
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.locals.pretty = true;
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser(app.get('secretKey')));
  app.use(express.session({key : app.get('cookieSessionKey')}));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/new_timeline', routes.new_timeline);
app.get('/past_timeline', routes.past_timeline);
app.post('/create', routes.create);

app.get("/livecamera", routes.livecamera);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

//var jade = require('jade'),
//jade_runtime = require('./node_modules/jade/lib/runtime'),
//jade_filters = require('./node_modules/jade/lib/filters');
//
//jade_filters.nl2br = function(text) {
//  return jade_runtime.escape(text).replace(/\n/g, "<br/>");
//}
