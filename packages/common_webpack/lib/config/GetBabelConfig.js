"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 获取babel配置
 * @param modules
 */
function getBabelConfig(modules) {
    var plugins = [
        require.resolve('babel-plugin-transform-es3-member-expression-literals'),
        require.resolve('babel-plugin-transform-es3-property-literals'),
        require.resolve('babel-plugin-transform-object-assign'),
        require.resolve('babel-plugin-transform-class-properties'),
        require.resolve('babel-plugin-transform-object-rest-spread'),
        require.resolve('babel-plugin-syntax-dynamic-import'),
    ];
    plugins.push([require.resolve('babel-plugin-transform-runtime'), {
            "helpers": false,
            "polyfill": false,
            "regenerator": true,
            "moduleName": "babel-runtime"
        }]);
    return {
        presets: [
            require.resolve('babel-preset-react'),
            [require.resolve('babel-preset-env'), {
                    modules: modules,
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
                }],
        ],
        plugins: plugins
    };
}
exports.getBabelConfig = getBabelConfig;
