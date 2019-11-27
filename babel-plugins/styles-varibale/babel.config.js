module.exports = {
    "presets": [
        [
            "@babel/preset-env",
            {
                "modules": false,
                "targets": {
                    "browsers": [">1%", "last 2 versions"]
                },
            }
        ],
    ],
    "plugins": [
        ["@babel/plugin-transform-runtime", {
            // 可选 false | 2 | 3,
            "corejs": 3,
            helpers: true,
            regenerator: true,
            useESModules: true
        }]

    ],
};
