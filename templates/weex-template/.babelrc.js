const config = require("common_webpack/babel/babelrc7");
config.plugins.push([
    // "import",
    // {
    //     "libraryName": "weex-ui",
    //     "libraryDirectory": "packages",
    //     "style": true
    // },
    "component",
    {
        "libraryName": "weex-ui",
        "libDir": "packages"
    }
]);

module.exports = config;
