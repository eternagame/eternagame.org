import webpackHotMiddlewareClient from 'webpack-hot-middleware/client?noInfo=true&reload=true';

webpackHotMiddlewareClient.subscribe(({ reload }) => {
  if (reload) window.location.reload();
});
