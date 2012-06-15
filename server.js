/*===========================================================================
  HTML5 Express Boilerplate ("H5EB")
============================================================================= */
/*===========================================================================
  TODO: JSHINT GLOBAL VARS, CONFIG, AND INSTRUCTIONS
============================================================================= */
/*===========================================================================
  DEPENDENCIES
============================================================================= */
var express = require('express'),
    inspect = require('inspect'),
    colors = require('colors'),
    sys = require('util'),
    mime = require('mime'),
    cleanCSS = require('clean-css'),
    httpProxy = require('http-proxy'),
    rest = require('restler'),
    rand = require('mersenne').rand,
    less = require('less'),
    lessMiddleware = require('less-middleware'),
    app = module.exports = express.createServer();


/*===========================================================================
  SETTINGS
============================================================================= */

var port = process.env.PORT || 3000,
    cacheAge = 60000 * 60 * 24 * 365,
    logs = {
        set: false,
        string: '\\n  ' + ':date'.bold.underline + '\\n\\n' + '  IP: '.cyan.bold + ' ' + ':remote-addr'.white + '\\n' + '  Method: '.red.bold + ':method'.white + '\\n' + '  URL: '.blue.bold + ':url'.white + '\\n' + '  Status: '.yellow.bold + ':status'.white + '\\n' + '  User Agent: '.magenta.bold + ':user-agent'.white
    };


/*===========================================================================
  DEFAULT CONFIG
============================================================================= */

app.configure(function () {
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    express.logger();
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.favicon(__dirname + '/public/favicon.ico'));
    app.use(lessMiddleware({
        src: __dirname + '/public',
        compress: true
    }));
    app.use(app.router);
    if (logs.set) app.use(express.logger(logs.string));
});


/*===========================================================================
  DEVELOPMENT CONFIG
  $ node server.js
============================================================================= */

app.configure('development', function () {

    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});


/*===========================================================================
  PRODUCTION CONFIG
  $ NODE_ENV=production node server.js
============================================================================= */

app.configure('production', function () {
    port = 8080;
    app.use(express.static(__dirname + '/public', {
        maxAge: cacheAge
    }));
    app.use(express.errorHandler());
});


/*===========================================================================
  ERROR HANDLING
============================================================================= */

// Since this is the last non-error-handling
// middleware use()d, we assume 404, as nothing else
// responded.
app.use(function (req, res, next) {
    // the status option, or res.statusCode = 404
    // are equivalent, however with the option we
    // get the "status" local available as well
    res.render('404', {
        layout: false,
        status: 404,
        //url: req.url,
        title: '404 Error'
    });
});

// error-handling middleware, take the same form
// as regular middleware, however they require an
// arity of 4, aka the signature (err, req, res, next).
// when connect has an error, it will invoke ONLY error-handling
// middleware.
// If we were to next() here any remaining non-error-handling
// middleware would then be executed, or if we next(err) to
// continue passing the error, only error-handling middleware
// would remain being executed, however here
// we simply respond with an error page.
app.use(function (err, req, res, next) {
    // we may use properties of the error object
    // here and next(err) appropriately, or if
    // we possibly recovered from the error, simply next().
    res.render('500', {
        layout: false,
        status: err.status || 500,
        error: err,
        title: '500 Error'
    });
});


/*===========================================================================
  YOUR ROUTES
============================================================================= */

// Default from HTML5 Boilerplate 
app.get('/demo', function (req, res) {
    res.render('index', {
        modernizr: "javascripts/libs/modernizr-2.0.6.min.js",
        jquery: "javascripts/libs/jquery-1.7.2.min.js",
        title: 'this is a title',
        description: 'this is a description',
        javascripts: ["javascripts/script.js"],
        stylesheets: ["style.css"]
    });
});

app.get('/', function (req, res) {
    res.render('lights', {
        modernizr: "javascripts/libs/modernizr-2.0.6.min.js",
        jquery: "javascripts/libs/jquery-1.7.2.min.js",
        title: 'Dill Flies',
        description: 'Lights',
        javascripts: ["javascripts/script.js", "javascripts/lights.js"],
        stylesheets: ["style.css"]
    });
});

app.get('/mu-*', function (req, res) {
    console.log('blitz.io validation');
    res.send('42');
});

/*===========================================================================
  API.DILLFLIES.COM ROUTES
============================================================================= */

app.get('/lights-demo', function (req, res) {
    console.log('/lights - test only');
    values = ["html", Boolean(rand(2)), Boolean(rand(2)), Boolean(rand(2)), Boolean(rand(2))];
    console.log(values);
    res.json(values);
});

app.get('/lights', function (req, res) {
    console.log('/lights');
    rest.get('http://web1.tunnlr.com:12375/Set.cmd', {
        username: 'admin',
        password: '12345678',
        query: {
            CMD: 'GetPower'
        }
    }).on('complete', function (result, response) {
        if (result instanceof Error) {
            console.log('Error: ' + result.message);
            res.send(400, "Failed to GetPower");
            return;
        }

        if (result.length) {
            console.log(result);

            var lights = null;
            var matchResults = result.match('......p61=(.)[,]p62=(.)[,]p63=(.)[,]p64=(.).....*');
            console.log(matchResults);
            res.json(matchResults); // index [1] is port 1, index 0 is unused by use (but populated by .match())
            return;
        } else {
            console.log('Error: ' + result.message);
            res.send(400, "Failed to GetPower");
            return;
        }
    });
});

app.get('/lights-demo/:port/:state', function (req, res) {
    result = '<html>p61=1</html>'
    lightStatus = result.match('.......[6](.)=(.).....*');
    console.log(lightStatus);
    res.json(lightStatus);
});

app.get('/lights/:port/:state', function (req, res) {
    console.log('/lights/:port/:state');
    if (req.params.port === 'x') {
        req.params.port = rand(4) + 1;
        console.log("req.params.port = (random) " + String(req.params.port));
    }
    if (req.params.state === 'x') {
        req.params.state = rand(2);
        console.log("req.params.state = (random) " + String(req.params.state));
    }
    query = "P6" + req.params.port + "=" + req.params.state;
    url = 'http://web1.tunnlr.com:12375/Set.cmd?CMD=SetPower+' + query;
    console.log(url);
    rest.get(url, {
        username: 'admin',
        password: '12345678'
    }).on('complete', function (result, response) {
        if (result instanceof Error) {
            console.log('Error: ' + result.message);
            res.send(400, "Failed to GetPower");
            return;
        }
        console.log(result);
        lightStatus = result.match('.......[6](.)=(.).....*');
        console.log(lightStatus);
        res.json(lightStatus);
    });
});


/*===========================================================================
  UNUSED - AJAX PROXY
============================================================================= */
var proxy = new httpProxy.RoutingProxy();
app.get('/ippower', function (req, res) {
    proxy.proxyRequest(req, res, {
        host: 'ippower.dillflies.com',
        port: 12375
    });
});

/*===========================================================================
  ERROR TESTING
============================================================================= */

/*
// 404 Error
app.get('/404', function(req, res, next){
  next();
});

// 403 Error
app.get('/403', function(req, res, next){
  var err = new Error('not allowed!');
  err.status = 403;
  next(err);
});

// 500 Error
app.get('/500', function(req, res, next){
  next(new Error('keyboard cat!'));
});
*/

/*===========================================================================
  WILDCARD MIDDLEWARE
============================================================================= */

function wildcard(req, res, next) {

    /*=========================================================================
    BETTER WEBSITE EXPERIENCE FOR IE USERS
  =========================================================================== */
    var url = req.url,
        ua = req.headers['user-agent'],
        reqPath = req.url;

    if (ua && ua.indexOf('MSIE')) res.setHeader('X-UA-Compatible', 'IE=Edge,chrome=1');

    // We don't want to send this header on _everything_
    if (reqPath.match(/\.(js|css|gif|png|jpe?g|pdf|xml|oga|ogg|m4a|ogv|mp4|m4v|webm|svg|svgz|eot|ttf|otf|woff|ico|webp|appcache|manifest|htc|crx|xpi|safariextz|vcf)$/)) {
        res.removeHeader('X-UA-Compatible');
        res.removeHeader('IE=Edge,chrome=1');
    }

    /*=========================================================================
    CORS
  =========================================================================== */
    // Force the latest IE version, in cases when it may fall back to IE7 mode
    // http://github.com/rails/rails/commit/123eb25#commitcomment-118920
    // Use ChromeFrame if it's installed, for a better experience with IE folks
    // Control cross domain using CORS http://enable-cors.org
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");

    /*=========================================================================
    MIME TYPES
  =========================================================================== */

    // Until pull request is in
    // https://github.com/bentomas/node-mime
    mime.define({
        'font/opentype': ['otf'],
        'text/cache-manifest': ['appcache', 'manifest'],
        'text/x-component': ['htc'],
        'application/x-chrome-extension': ['crx'],
    });

    // TODO: Allow concatenation from within specific js and css files
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L111
    // TODO: Gzip compression
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L137
    // TODO: Expires headers (for better cache control)
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L186
    // TODO: Stop screen flicker in IE on CSS rollovers
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L271
    // TODO: Cookie setting from iframes
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L286
    // TODO: Suppress or force the "www." at the beginning of URLs
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L315
    // TODO: Built-in filename-based cache busting
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L356
    // TODO: Prevent SSL cert warnings
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L376
    // TODO: UTF-8 encoding
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L411
    // TODO: Block access to "hidden" directories whose names begin with a period
    // https://github.com/paulirish/html5-boilerplate/blob/master/.htaccess/#L442
    next();
}

/*===========================================================================
  ALWAYS KEEP THIS ROUTE LAST
============================================================================= */
app.use(wildcard);

/*===========================================================================
  START EXPRESS SERVER
============================================================================= */

app.listen(port);
var appPort = app.address().port + '',
    appEnv = app.settings.env.toUpperCase();

sys.puts('' + 'SERVER LISTENING ON PORT '.rainbow + " ".white.inverse + appPort.white.inverse + " ".white.inverse + ' IN '.rainbow + " ".white.inverse + appEnv.white.inverse + " ".white.inverse + ' MODE '.rainbow);