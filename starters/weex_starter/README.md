##### weex starter

##### 由于官方提供的weex-vue-precompiler 无法正确编译如下代码：

     <text value='1234'></text>
     需要使用私服中的版本
     
##### 目录结构    
```
|--weex_starter
|----android
|----ios
|----src
|------bootstartup          页面启动相关初始化
|------config               项目配置
|------dev                  开发环境下的查看页面
|------mixins               通用的mixins
|------resources            资源处理
|------route                路由相关
|------session              用户会话相关
```

#### mixins 说明

- [AppMixin](./src/mixins/AppMixin.ts) ，默认情况下所有的页面应该都需要导入该mixin
```

 
 该mixin提供了如下功能
   1: 初始化了通过路由传入的参数和state
   2: 尝试加载用户的会话信息（通过WeexDefaultSessionManager），提供了member属性
   3: 尝试调用页面提供的onReady方法以及设置viewIsReady=true
   4: 提供了toView和backView方法（详见AppRouterHelper）

```

- [PageQuery](./src/mixins/paging/PageQuery.ts)，提供了一个分页处理的维护，如果有使用了[drop-refresh](../../components/weex_components/src/layout/drop-refresh/README.md)相关的组件则不需要使用这个mixin