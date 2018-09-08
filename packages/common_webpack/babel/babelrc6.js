/**
 * babel6配置
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
