const config = {
  projectName: 'oak-taro-template',
  date: '2018-12-12',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: {
    babel: {
      sourceMap: true,
      presets: [
        'env'
      ],
      plugins: [
        'transform-decorators-legacy',
        'transform-class-properties',
        'transform-object-rest-spread'
      ]
    },
    // typescript: {
    //   compilerOptions: {
    //     allowSyntheticDefaultImports: true,
    //     baseUrl: '.',
    //     declaration: false,
    //     experimentalDecorators: true,
    //     jsx: 'preserve',
    //     jsxFactory: 'Nerv.createElement',
    //     module: 'esnext',
    //     moduleResolution: 'node',
    //     noImplicitAny: false,
    //     noUnusedLocals: true,
    //     outDir: './dist/',
    //     preserveConstEnums: true,
    //     removeComments: false,
    //     rootDir: '.',
    //     sourceMap: true,
    //     strictNullChecks: true,
    //     target: 'es6'
    //   },
    //   include: [
    //     'src/**/*',
    //     "types/index.d.ts",
    //     "node_modules/common_fetch/types/index.d.ts",
    //     "node_modules/taro_starter/src/**/*"
    //   ],
    //   exclude: [
    //     'node_modules'
    //   ],
    //   compileOnSave: false
    // }
  },
  defineConstants: {},
  copy: {
    patterns: [],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        url: {
          enable: true,
          config: {
            limit: 10240 // 设定转换尺寸上限
          }
        },
        // css modules 功能开关与相关配置
        // cssModules: {
        //   enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        //   config: {
        //     generateScopedName: '[name]__[local]___[hash:base64:5]'
        //   }
        // }
      }
    },
    compile: {
      include: [
        "taro_starter"
      ]
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    router: {
      mode: 'browser'
    },
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // css modules 功能开关与相关配置
        // cssModules: {
        //   enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        //   config: {
        //     generateScopedName: '[name]__[local]___[hash:base64:5]'
        //   }
        // }
      }
    },
    webpackChain(chain, webpack) {
      //webpack 4的写法
      chain.module.rule('compile')
        .test(/\.ts[x]?$/)
        .exclude
        .add((path) => {

          //是否为node_modules中的模块
          var isNodeModules = path.indexOf("node_modules") >= 0;

          var isWxpComponents = ["_starter", "oak_", "common_"].some((item) => {
            return path.indexOf(item) >= 0;
          });
          if (isWxpComponents || path.endsWith("_starter")) {
            return false;
          }
          return isNodeModules;
        }).end()
        .use("tsx")
        .loader("awesome-typescript-loader")
        .options({
          presets: [
            [
              'env',
              {modules: false}
            ]
          ]
        });

    },
    esnextModules: [
      "taro_starter"
    ],
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
};
