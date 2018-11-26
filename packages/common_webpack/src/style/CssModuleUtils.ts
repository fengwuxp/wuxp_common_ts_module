export const cssModuleLoader = ({resource}) => ({
    ident:"css-loader",
    loader: 'css-loader',
    options: {
        minimize: true,
        importLoaders: 1,
        //判断是否需要css module
        modules: /\.module\.css/.test(resource),
        localIdentName: '[name]__[local]___[hash:base64:5]',
        ident: "postcss-loader",
    }
});



