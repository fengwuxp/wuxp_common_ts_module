
#### oak-weex-template模板目录说明

```
|--oak-weex-template
|-----app                  原生项目的目录
|-------android
|-------ios
|-----dist                 原生应用的bundlejs
|-----dist_web             web端js
|-----public               web开放环境需要的框架js
|-----src
|-------components         组件
|-------config             项目配置
|-------container          sub page  子页面
|-------less               通用的less
|-------route              路由配置
|-------services           api接口，或者可以放到api目录，或是依赖一个feign api sdk模块
|-------utils              工具类
|-------views              App的页面
|-------Mian.js            web端入口js
|-----static_resource      静态资源目录
|--------images            图标
|--------fonts             字体文件（主要用于字体图标）
|-----theme                主题定制
|-----types                自定义的d.ts
|-----webpack-config       wepack 的一些打包配置，如环境变量等

```

#### 打包说明命令说明
```
 build:web: 构建web端的最终输出
 build:web-prod: 构建web端的最终输出，会进行js和css等压缩
 
 build:native：构建原生端的输出
 build:native-prod：构建原生端的输出，会进行js压缩
 build:native-release：构建结果和build:native-prod一样，不过打包的输出目标是对应的android和ios的工程
 下的目录，也是就是构建本地包
  
  备注：本地包和远程包的概念
  远程：js和图片字体图标的等资源都放在远程服务器上，可以进行热更新
  本地：s和图片字体图标的等资源都打包到最终apk或ios的安装文件中，不可以进行热更新

```
#### ui组件
- [weex-ui](https://github.com/alibaba/weex-ui)，weex官方出的组件
- [weex_components](../../components/weex_components)，通用组件
- [common_icons](../../components/common_icons)，字体图标组件，使用了[react-native-vector-icons](https://oblador.github.io/react-native-vector-icons/)提供的字体图标

