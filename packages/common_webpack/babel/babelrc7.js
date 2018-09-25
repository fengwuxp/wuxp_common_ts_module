/**
 * babel7配置
 * @author wxup
 * @create 2018-09-08 10:45
 **/
module.exports = {
    presets: [
        [
            "@babel/env",
            {
                "targets": {
                    "browsers": [
                        "last 2 versions"
                    ]
                },
                // useBuiltins: "entry"
                useBuiltins:"usage"
            },

        ],
        "@babel/preset-react"
        //    "@babel/typescript"
    ],
    plugins: [
        [
            "@babel/plugin-proposal-class-properties",
            {
                loose: false
            }
        ],
        [
            "@babel/plugin-proposal-decorators",
            {
                legacy: true
            }
        ],
        "@babel/plugin-proposal-json-strings",
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        [
            "@babel/plugin-transform-regenerator",
            {
                asyncGenerators: true,
                generators: true,
                async: true
            }
        ],
        [
            "@babel/plugin-transform-runtime",
            {
                corejs:2,  //false or 2
                helpers: false,
                regenerator: true,
            }
        ],
    ]
};
