module.exports = {
    plugins: [
        require('postcss-plugin-weex')(),
        require('autoprefixer')(),
        require('postcss-plugin-px2rem')({
            rootValue: 75,
            minPixelValue: 1.01
        })
    ]
};
