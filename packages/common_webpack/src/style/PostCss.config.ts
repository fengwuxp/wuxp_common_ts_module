import autoprefixer from "autoprefixer";

export const postCssConfig = {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: () => [
        require('postcss-flexbugs-fixes'),
        require('precss'),
        require('postcss-cssnext'),
        autoprefixer({
            browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // React doesn't support IE8 anyway
            ],
            flexbox: 'no-2009',
        }),
    ]
};
