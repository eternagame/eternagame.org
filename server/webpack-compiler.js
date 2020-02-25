const path = require('path');
const resolve = file => path.resolve(__dirname, file);

const webpack = require('webpack');
const memoryFS = require('memfs');

const vueCli = require('@vue/cli-service');

process.env.VUE_APP_MODE = 'ssr';
const cliService = new vueCli(resolve('..'));
cliService.init();

process.env.VUE_APP_ENV = 'client';
const clientConfigChain = cliService.resolveChainableWebpackConfig();

process.env.VUE_APP_ENV = 'server';
const serverConfigChain = cliService.resolveChainableWebpackConfig();

clientConfigChain
    .entry('app')
    .prepend(resolve('./hmr-client'))
    .end()
    .output.filename('[name].js');

// Webpack currently expects memory-fs, which has an additional property not in node's `fs` spec
memoryFS.join = path.join

// Compiled files live in-memory
const client = webpack(clientConfigChain.toConfig());
client.outputFileSystem = memoryFS;
const server = webpack(serverConfigChain.toConfig());
server.outputFileSystem = memoryFS;

module.exports = {
    client,
    server,
    // These will be the same for client and server, so we're arbitrarily choosing client
    outputPath: clientConfigChain.output.get('path'),
    outputPublicPath: clientConfigChain.output.get('publicPath'),
}
