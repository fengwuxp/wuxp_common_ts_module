const config = require("common_webpack/babel/babelrc7");
config.plugins.push([
    "component",
    {
        "libraryName": "weex-ui",
        "libDir": "packages"
    }
]);

module.exports = config;
