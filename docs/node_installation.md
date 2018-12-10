
##### windows node环境安装

       1:到 https://nodejs.org/en/download/ 下载安装包， 选择windows版本

       2：安装包下载安装成功后，打开cmd 运行 node --version 或 npm -v

更多请参考[NodeJS入门（一）---nodejs详细安装步骤](https://blog.csdn.net/muzidigbig/article/details/80493880)


##### 设置npm为国内镜像（淘宝）


        npm config set registry https://registry.npm.taobao.org

        // 配置后可通过下面方式来验证是否成功
        npm config get registry

        如果要设置为自己的私服只要替换镜像地址就可以了

        npm config set  xxxx (例如：http://nexus.oaknt.com:18081/repository/oak_npm_group/)

        可以通过npm config list 来查看所有配置


##### node 安装失败的处理 参见[整理 node-sass 安装失败的原因及解决办法](https://segmentfault.com/a/1190000010984731)

##### npm的包依赖管理 [npm 依赖包管理](https://blog.csdn.net/u011584949/article/details/80449802)