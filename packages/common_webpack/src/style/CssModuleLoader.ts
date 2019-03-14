


export const cssModuleLoader = ({resource}) => ({
    loader: 'css-loader',
    options: {
        minimize: true,
        importLoaders: 1,
        //判断是否需要css module
        modules: /\.module\.css/.test(resource),
        localIdentName: '[name]__[local]___[hash:base64:5]',
        ident: "css-loader"
    }
});

export const lessModuleLoader = ({resource}) => ({
    loader: 'css-loader',
    options: {
        minimize: true,
        importLoaders: 2,
        //判断是否需要css module
        modules: /\.module\.less/.test(resource),
        localIdentName: '[name]__[local]___[hash:base64:5]',
        ident: "css-loader"
    }
});

export const scssModuleLoader = ({resource}) => ({
    loader: 'css-loader',
    options: {
        minimize: true,
        importLoaders: 2,
        //判断是否需要css module
        modules: /\.module\.scss/.test(resource),
        localIdentName: '[name]__[local]___[hash:base64:5]',
        ident: "css-loader"
    }
});
