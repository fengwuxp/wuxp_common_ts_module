/* eslint-disable import/no-commonjs */
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  weapp: {
    postcss: {
      // 小程序端样式引用本地资源内联
      url: {
        enable: true,
        limit: 102400000000
      }
    }
  },
  h5: {
    publicPath: './',
  }
}
