const configs = require('./webpack.web.config.js');
const ip = require('quick-local-ip').getLocalIP4();
const path = require('path');
const chalk = require('chalk');
let config = Array.isArray(configs) ? configs[0] : configs;
config.devServer = {
    contentBase: path.join(__dirname, ''),
    compress: true,
    host: '0.0.0.0',
    public: ip + ':9091',
};

console.log('server is running! Please open ' + chalk.green('http://' + ip + ':9091/index.html'));
module.exports = config;