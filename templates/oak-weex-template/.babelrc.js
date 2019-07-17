const config = require("fengwuxp_common_webpack/babel/babelrc7");
config.plugins.push([
    "component",
    {
        "libraryName": "weex-ui",
        "libDir": "packages",
        "style": false
    }
]);

module.exports = config;
