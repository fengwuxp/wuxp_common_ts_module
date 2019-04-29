
#### feign代码模块使用说明


- 1：规划客户的api模块，拦截器，等统一处理
- 2：初始化feign, 需要实现[FeignProxyInitializer](https://github.com/fengwuxp/wuxp_common_ts_module/blob/master/packages/common_fetch/src/proxy/feign/FeignProxyInitializer.ts)接口

        export default MyFeignProxyInitializer implements FeignProxyInitializer{

               initFeignProxyFactory(...args){
                   //定制自己的RestTemplate，拦截器等配置
                   //重要的一步：设置代理执行器
                   // DefaultProxyServiceExecutor 是默认提供的代理执行器，如果不满足需求，可以自行实现 AbstractProxyServiceExecutor类或ProxyServiceExecutor接口
                   FeignProxyExecutorHolder.registerDefaultExecutor(  new DefaultProxyServiceExecutor(...args))
               }

        }

- 更多请参考[common_feign](https://github.com/fengwuxp/wuxp_common_ts_module/blob/master/packages/common_fetch/README.md)