

#### 基于京东开源的Taro开源框架开发的小程序

- [Taro](https://github.com/NervJS/taro)

- [官方文档](https://nervjs.github.io/taro/docs/GETTING-STARTED.html)


#### 启动步骤

     1：确认 node环境和yarn工具已经安装（npm需要设置成私服）

     2：安装Taro:  yarn global add @tarojs/cli

     3：安装依赖 (yarn install 或者运行package.json定义的yarn_i命令)

     4：npm run dev:h5 (idea可以直接在package.json点击命令运行)


#### 环境安装参考

- 参考[node_installation.md](../../docs/node_installation.md)

#### 接口Api模块使用Feign proxy

- [common_fetch] (https://github.com/fengwuxp/wuxp_common_ts_module/tree/master/packages/common_fetch)


#### 扩展


               1：Feign                        代理相关，具体参考 common_fetch

               2: TaroLocalStorage            这是一个统一抽象LocalStorage的Taro实现

               3: taroDefaultSessionManager   默认的会话管理器 基于TaroLocalStorage的实现

               3: TaroNavigatorAdapter        提供和浏览器一直的Api


#### 使用方式（需要注意）

