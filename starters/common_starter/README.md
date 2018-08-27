
##### webpack4打包优化[https://juejin.im/post/5ac76a8f51882555677ecc06]


#### 异步加载[https://segmentfault.com/a/1190000010253013] [https://github.com/WhiteYin/translation/issues/7]

         结论：
         webpack 的 Dynamic Imports 实现主要是利用 ECMAScript的 import() 动态加载特性，
         而 import() 目前只是一个草案，如果需要用此方法，需要引入对应的转换器，如 babel-plugin-syntax-dynamic-import
         
         TypeScript配置
         我们在项目中使用了typescript。我们必须在tsconfig.json中更新esnext的module配置，
         //以及设置removeComments为false
         （要支持动态注入，TS的版本必须高于2.4）。这样，之前的动态注入才会起作用。通过“告诉”typescript编译器避开我们的import语句，
         并且不要对它们进行转码来让Webpack正常工作。
         
         {
           "compilerOptions": {
             "target": "es5",
             "sourceMap": false,
             "inlineSourceMap": true,
             "module": "esnext",
             "moduleResolution": "node",
             "jsx": "react",
             "preserveConstEnums": true,
             //"removeComments": false,
             "lib": ["es6", "dom"]
           },
           "types": ["node"]
         }
         
         babel-loader
         {
                                     loader: "babel-loader",
                                     options: {
                                         // presets: ['es2015', 'stage-2'],
                                         cacheDirectory: true,
                                         presets: ["react", "env"],
                                         plugins: [
                                             //exnext 动态导入
                                             'syntax-dynamic-import'
                                         ],
                                         compact: true
                                     }
           }
         