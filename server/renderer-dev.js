const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const chokidar = require('chokidar');
const compiler = require('./webpack-compiler');

function readFile(fs, file) {
  try {
    return fs.readFileSync(path.join(compiler.outputPath, file), 'utf-8');
  } catch (e) { console.log(e); }
};

class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });

    this.done = false;
  }

  resolve(val) {
    if (!this.done) this._resolve(val);
    this.done = true;
  }

  reject(err) {
    if (!this.done) this._resolve(err);
    this.done = true;
  }
}

module.exports = async function initDevRenderer(templatePath) {
  let getRenderer = new Deferred();

  let template = fs.readFileSync(templatePath, 'utf-8');
  let bundle;
  let clientManifest;

  let renderer;
  const getDevRenderer = () => renderer;

  const createFreshRenderer = () => {
    if (bundle && clientManifest) {
      renderer = createBundleRenderer(bundle, {
        template,
        clientManifest,
        runInNewContext: false
      });
      getRenderer.resolve(getDevRenderer);
    }
  }

  compiler.client.hooks.done.tap('ClientManifestWatcher', stats => {
    const { errors } = stats.toJson();
    errors.forEach(error => console.error(error));
    if (errors.length) return;

    console.log('Client compilation complete');

    clientManifest = JSON.parse(
      readFile(compiler.client.outputFileSystem, 'vue-ssr-client-manifest.json'),
    );

    createFreshRenderer();
  });

  compiler.server.watch({ 'info-verbosity': 'none' }, (error, stats) => {
    if (error) throw error;
    stats = stats.toJson();
    if (stats.errors.length) return;

    console.log('Server compilation complete');

    bundle = JSON.parse(
      readFile(compiler.server.outputFileSystem, 'vue-ssr-server-bundle.json'),
    );

    createFreshRenderer();
  });

  chokidar.watch(templatePath).on('change', () => {
    template = fs.readFileSync(templatePath, 'utf-8');

    createFreshRenderer();
  });

  return getRenderer.promise;
}
