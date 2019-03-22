
#### lerna是一个模块管理工具

####  [lerna](https://github.com/lerna/lerna)

#### 安装

     npm i -g lerna

     启动

     （私服）在安装依赖之前要登录 npm login --registry  http://nexus.oaknt.com:18081/repository/oak_npm_group/
            在发布模块之前要执行 npm adduser --registry http://nexus.oaknt.com:18081/repository/oak_npm_hosted/

            npm i --loglevel=silly


     lerna bootstrap
     切记使用这个指令代替 npm install。默认使用npm安装，如果需要使用yarn或者cnpm可参考4.
     这个指令会执行以下操作：


     在每个 package 下面执行 npm install 。
     根据各个 package 下 package.json 里面的 dependencies 和 devDependencies 配置，使用 symlink 在各个 package 的 node_modules 下面建立引用关系。
     在每个 package 下执行 npm run prepublish 。
     在每个 package 下执行 npm run prepare 。


#### 更多请参考[官方文档](https://lernajs.io/)

#### 社区文章
- [npm私服搭建] (https://blog.csdn.net/itKingOne/article/details/81448592)
- [使用lerna管理大型前端项目](https://www.jianshu.com/p/2f9c05b119c9)
- [lerna入门指南](http://www.ayqy.net/blog/lerna%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97/)