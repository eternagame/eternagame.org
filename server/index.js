const path = require('path');
const resolve = file => path.resolve(__dirname, file);
const chokidar = require('chokidar');

const express = require('express');
const app = express();

const PRODUCTION = process.env.NODE_ENV == 'production';
console.log("production: " + PRODUCTION)

const dotenv = require('dotenv');
const loadEnv = envPath => {
  try {
    dotenv.config({ path: envPath });
  } catch (err) {
    // only ignore error if file is not found
    if (err.toString().indexOf('ENOENT') < 0) {
      throw err;
    }
  }
}

// Contrary to what you'd expect, the first env loaded is the one whose values are kept
loadEnv(resolve('../.env.local'));
loadEnv(resolve('../.env'));

const PORT = process.env.PORT;
const HOST = (PRODUCTION ? "0.0.0.0" : process.env.HOST);

async function run() {
  const templatePath = resolve('../public/index.template.html');

  if (!PRODUCTION) {
    const compiler = require('./webpack-compiler');

    const webpackDevMiddleware = require('webpack-dev-middleware')(
      compiler.client,
      {
        publicPath: compiler.outputPublicPath,
        logLevel: 'error',
      },
    );
    app.use(webpackDevMiddleware);

    const webpackHotMiddleware = require('webpack-hot-middleware')(
      compiler.client,
      { heartbeat: 5000 },
    );
    app.use(webpackHotMiddleware);

    // This event handler is registered after the one in renderer-dev, and that one also executes
    // synchronously, so it is safe to assume that the new renderer is already available
    chokidar.watch(templatePath).on('change', () => {
      webpackHotMiddleware.publish({ reload: true });
    });
  } else {
    app.use(express.static(resolve('../dist')));
  }

  const getRenderer = PRODUCTION ? require('./renderer-prod')(templatePath) : await require('./renderer-dev')(templatePath);

  app.get('*', (req, res, next) => {
    let context = {
      url: req.url,
      title: 'Eterna',
      cookies: req.get('cookie')
    };

    getRenderer().renderToString(context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          if (!PRODUCTION) {
            next();
            return;
          }
          res.status(404).send('Page not found')
        } else {
          res.status(500).send('Internal Server Error')
          console.error(`error during render : ${req.url}`);
          console.error(err.stack);
        }
      } else {
        res.send(html)
      }
    });
  });

  if (!PRODUCTION) {
    const proxy = require('http-proxy-middleware')({
      target: process.env.VUE_APP_API_BASE_URL,
      secure: false,
      changeOrigin: true,
      cookieDomainRewrite: 'localhost',
    });
    app.use(proxy);
  }

  app.listen(PORT, HOST, () => console.log(`Server is listening on ${HOST}:${PORT}`))
}

run();
