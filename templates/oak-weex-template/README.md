
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
