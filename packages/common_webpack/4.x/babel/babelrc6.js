/**
 * babel 6 配置
 * @author wxup
 * @create 2018-09-08 10:45
 **/
module.exports = {
    presets: [
        "react",
        "env"
    ],
    plugins: [
        [
            "transform-object-assign",
            "transform-class-properties",
            "transform-object-rest-spread",
            //装饰器
            "transform-decorators-legacy",
            //ES7async的支持
            "transform-runtime",

            {
                "helpers": false,
                "polyfill": false,
                "regenerator": true,
                "moduleName": "babel-runtime"
            }
        ]
    ]
};
