/**
 * babel 7 配置
 * @author wxup
 * @create 2018-09-08 10:45
 **/
module.exports = {
    presets: [
        [
            "@babel/preset-env",
            {
                "modules": false,
                useBuiltins: "usage",
                targets: {
                    browsers: [
                        'last 2 versions',
                        'Firefox ESR',
                        '> 1%',
                        'ie >= 9',
                        'iOS >= 8',
                        'Android >= 4',
                    ],
                },
            },

        ],
        // "@babel/preset-typescript",
        "@babel/preset-react",
        "@babel/preset-flow"
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
        "@babel/plugin-transform-async-to-generator",
        "@babel/plugin-transform-regenerator",
        [
            "@babel/plugin-transform-runtime",
            {
                // corejs: 2,  //false or 2
                helpers: false,
                regenerator: true,
            }
        ]
    ]
};
