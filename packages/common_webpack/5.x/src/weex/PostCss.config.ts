const postcssPluginWeex = require('postcss-plugin-weex');
const autoprefixer = require('autoprefixer');
const postcssPluginPx2Rem = require('postcss-plugin-px2rem');
export default {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: () => [
        postcssPluginWeex(),
        //使用.browserslistrc的统一配置
        autoprefixer(),
        postcssPluginPx2Rem({rootValue: 75, minPixelValue: 1.01})
    ]
};