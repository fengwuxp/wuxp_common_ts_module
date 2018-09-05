/**
 * 导出一个 css 模块化的css-loader
 * @param resource
 * @return {{loader: string, options: {minimize: boolean, importLoaders: number, modules: boolean, localIdentName: string}}}
 */

module.exports = {
    cssModuleLoader:({resource}) => ({
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 1,
            //判断是否需要css module
            modules: /\.module\.css/.test(resource),
            localIdentName: '[name]__[local]___[hash:base64:5]',
        }
    }),
    lessModuleLoader:({resource}) => ({
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 1,
            //判断是否需要css module
            modules: /\.module\.less/.test(resource),
            localIdentName: '[name]__[local]___[hash:base64:5]',
        }
    }),
    scssModuleLoader:({resource}) => ({
        loader: 'css-loader',
        options: {
            minimize: true,
            importLoaders: 1,
            //判断是否需要css module
            modules: /\.module\.scss/.test(resource),
            localIdentName: '[name]__[local]___[hash:base64:5]',
        }
    }),

}
