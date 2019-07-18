const config = require("fengwuxp-spring-webpack-4/lib/babel/babelrc7");

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
        },
        "ant-design"
    ],
    [
        "import",
        {
            "libraryName": "@ant-design/pro-layout",
            "libraryDirectory": "lib",
            "style": true
        },
        "ant-design/pro-layout"
    ]
);

module.exports = config;

// module.exports = function (api) {
//     api.cache(true);
//     return config;
// };
