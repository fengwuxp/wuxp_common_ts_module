
// const config=require("common_webpack/babel/babelrc7");

module.exports = {
    presets: [
        [
            "@babel/env",
            {
                "targets": {
                    "browsers": [
                        "last 2 versions"
                    ]
                }
            }
        ],
        "@babel/react"
        //    "@babel/typescript"
    ],
    plugins: [
        [
            "@babel/plugin-proposal-class-properties",
            {
                "loose": false
            }
        ],
        [
            "@babel/plugin-proposal-decorators",
            {
                "legacy": true
            }
        ],
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        [
            "@babel/plugin-transform-runtime",
            {
                "helpers": false,
                "regenerator": true
            }
        ],
        [
            "import",
            {
                "libraryName": "antd-mobile",
                "libraryDirectory": "lib",
                "style": true
            }
        ]
    ]
};