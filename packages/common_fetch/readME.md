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