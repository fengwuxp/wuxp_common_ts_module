
##### 1.从template目录中将webpack.template.dev.js 复制到项目根目录下改名为为webpack.local.dev.js

##### 2.根据实际情况进行配置
          
          /**
           * 接口请求被代理的入口地址
           * @type {string}
           */
          const proxyTarget = `http://localhost:8088/h5/`;
          
          /**
           * 代理服务器地址的web contenx
           * @type {RegExp}
           */
          const proxyServerWebContext = 'h5';


##### 安装依赖

       1. 设置仓库地址 npm config set registry http://nexus.oaknt.com:18081/repository/oak_npm_hosted/
          npm config list
  
       2. npm i 
       
       3. npm run serve-dev


       注意：1. 需要cross-env的支持 如果没有安装请先安装 npm i -g cross-env
            2. 需要typescrit的支持 npm i -g typescript@2.8.3


#### 字体图标 [https://github.com/oblador/react-native-vector-icons]
