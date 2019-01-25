#### 通用的fetch请求工具，支持浏览器，weex 微信小程序

#### 思路
          1：请求统一由client发出
          2: client有一个请求适配器进行真正的处理，已对应不同环境，比如浏览器，Nodejs weex 微信小程序，react-native
             默认已经实现了 浏览器，weex,微信小程序3个端
          3：请求过程可以插入前置、后置拦截器

#### 扩展自定义环境下的适配器
      只需要实现 FetchAdapter接口就可以了

#### 依赖的环境变量
       process.env.RUN_ENV，有效值：WEB、WEEX、WX_MIN_AAPP，默认值为web

##### 使用时需要设置 环境变量 process.env.RUN_ENV
##### 使用方式

          1: http adpater
               不同的平台的的http请求工具

          2: http client
               屏蔽了平台的差异化


          3: rest template
               (1)：固化了一系列的请求相关的内容 例如 超时时间定定义，统一拦截，统一异常处理
               (2)：支持多个模块的路由

          4 feign prroxy

               以接口代理的形式屏蔽远程调用的感知

          5  annation

                注解增强：

                Feign：标记一个类为Feign代理

                RequestMapping相关注解：标记方法

                //接口签名注解
                Signature: 可以标记那些参数需要加入签名

                //接口重试
                FetchRetry


                注解除了RequestMapping 外 还可以增加 CachePut, Task等 来管理本地缓存以及定时作业
                还可以考虑增加注解直接把请求下来的数据加入状态管理器中 例如redux
