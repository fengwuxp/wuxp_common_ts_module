#### 通用的fetch请求工具，支持浏览器，weex 微信小程序

#### 思路
          1：请求统一由engine发出
          2: engine由适配器进行初始化
          3：请求过程可以插入前置、后置拦截器

#### 扩展自定义环境下的适配器
      只需要实现 FetchAdapter接口就可以了

#### 依赖的环境变量
       process.env.RUN_ENV，有效值：WEB、WEEX、WX_MIN_AAPP，默认值为web

###### 使用时需要设置 环境变量 process.env.RUN_ENV
##### 使用方式

         单独使用
            1: 注册全局拦截器 FetchInterceptorRegister
                   FetchInterceptorRegister.register("xxx",xxx)

            2: 注册全局http错误处理者
                  HttpErrorHandlerRegister.register("xxx","xxxx")

            3: 使用 utils下的 BuildeFetchClientUtils 中的 buildFetchClient方法获取到一个fetchClient的实例


         结合服务代理使用，
             1: 注册全局拦截器 FetchInterceptorRegister
                    FetchInterceptorRegister.register("xxx",xxx)

             2: 注册全局http错误处理者
                   HttpErrorHandlerRegister.register("xxx","xxxx")

             3: 有且仅实现一个继承了AbstractArgumentsResolver 类的参数解析者， 并注册唯一实例到  ResolverRegister
                使用SimpleRequestURLResolver或者有且仅实现一个继承了RequestURLResolver 类的请求ULR解析者， 并注册唯一实例到  ResolverRegister

             4：BuilderProxyServiceUtil.build(XXX)获取一个代理服务的实例对象

##### TODO 要再次剥离 使其更加的通用

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

                注解增强，注解除了RequestMapping 外 还可以增加 CachePut, Task等 来管理本地缓存以及定时作业
                还可以考虑增加注解直接把请求下来的数据加入状态管理器中 例如redux
