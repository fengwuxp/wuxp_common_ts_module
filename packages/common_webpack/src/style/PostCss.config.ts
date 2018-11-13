import autoprefixer from "autoprefixer";

export default {
    // https://webpack.js.org/guides/migrating/#complex-options
    ident: 'postcss',
    plugins: () => [
        require('postcss-flexbugs-fixes'),
        require('precss'),
        require('postcss-cssnext'),
        autoprefixer({
            browsers: ['last 4 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        }),
    ]
};
