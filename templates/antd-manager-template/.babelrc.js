const config = require("fengwuxp_common_webpack/babel/babelrc7");

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
            "libraryName": "ant-design-pro",
            "libraryDirectory": "lib",
            "style": true
        }
    ]
);

module.exports = config;
