const config = require("common_webpack/babel/babelrc7");

// config.presets=  ["es2015","stage-0"];
config.plugins.push([
    "import",
    {
        "libraryName": "weex-ui",
        "libraryDirectory": "packages",
        "style": true
    }
]);

module.exports = config;
