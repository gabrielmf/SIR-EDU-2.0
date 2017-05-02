
const express     = require('express');
const app         = express();
const debug = require('debug')('app:server')
const path = require('path')
const webpack = require('webpack')
const compress = require('compression')
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const mongoose    = require('mongoose');
const rootDir = path.resolve(__dirname, '../../');
const webpackConfig = require(rootDir + '/config/webpack.config')
const project = require(rootDir + '/config/project.config')
const jwt = require('express-jwt');

//needed because mongoose native promises is deprecated
mongoose.Promise = Promise;

//imports
var config = require('../config/config'); // get our config file
var routes = require('../controllers/controllers');

mongoose.connect(config.database, (err) => {
	if (err) throw err;
});

/* App Middlewares */

// Apply gzip compression
app.use(compress())

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

// use morgan to log requests to the console
app.use(morgan('dev'));

// TODO refresh token
const jwtOptions = { secret: config.secret, ignoreExpiration: true, 
  getToken: function fromHeaderOrQuerystring (req) {
      if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
          return req.headers.authorization.split(' ')[1];
      } else if (req.query && req.query.token) {
        console.log(req);
        return req.query.token;
      }
      return null;
   } 
};

// App routes
app.use('/api', jwt(jwtOptions).unless({path: [ '/api/authenticate' , '/api/register']}), routes);
app.use('/uploads', express.static(rootDir + '/uploads'));

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
  app.use('*', function (req, res, next) {
    res.sendFile(project.paths.dist() + '/index.html');
  });
}

module.exports = app