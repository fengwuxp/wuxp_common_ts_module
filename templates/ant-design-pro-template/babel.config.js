const config = require("typescript-spring-webpack-4/lib/babel/babelrc7");

/**
 * @doc https://babeljs.io/docs/en/configuration#babelconfigjs
 */
config.plugins.push(
    [
        "import",
        {
            "libraryName": "antd",
            "libraryDirectory": "lib",
            "style": true
        }
    ],
    [
        "import",
        {
            "libraryName": "@ant-design/pro-layout",
            "libraryDirectory": "lib",
            "style": true
        }
    ]
);
module.exports = config;
