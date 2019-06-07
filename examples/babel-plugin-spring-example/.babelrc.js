const config = require("common_webpack/babel/babelrc7");

// config.plugins.push([
//     "spring",
//     {
//         scanPackages:[
//             "test-model-1"
//         ]
//     }
// ]);

config.plugins.push([
    "import",
    {
        libraryName: "antd-mobile",
        libraryDirectory: "lib",
        style: true
    }
]);

module.exports = config;
