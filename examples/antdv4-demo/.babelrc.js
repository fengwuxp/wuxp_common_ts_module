/**
 * babel 7 配置
 * @author wxup
 * @create 2018-09-08 10:45
 * @link {https://babeljs.io/docs/en/}
 **/
module.exports = {
    presets: [
        [
            // @link https://babeljs.io/docs/en/babel-preset-env
            "@babel/preset-env",
            {
                // modules: false,
                // shippedProposals:true
                // useBuiltins: "usage"
                // include:[
                //     "es7.array"
                // ]
            },

        ],
        // "@babel/preset-typescript",
        "@babel/preset-react",
        // "@babel/preset-flow"
    ],
    plugins: [
        [
            "import",
            {
                "libraryName": "@ant-design/icons",
                "libraryDirectory": "",
                "style": false,
                camel2DashComponentName: false
            },
            "@ant-design/icons"
        ],

        [
            "import",
            {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": false,
                camel2DashComponentName: false
            },
            "antd"
        ],
        [
            "import",
            {
                "libraryName": "@ant-design/pro-layout",
                // "libraryDirectory": "es",
                "style": false,
                customName: function customName(name) {
                    return "@ant-design/pro-layout/es/"+name;
                },
                camel2DashComponentName: false
            },
            "@ant-design/pro-layout"
        ],
        "@babel/plugin-proposal-object-rest-spread",
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

