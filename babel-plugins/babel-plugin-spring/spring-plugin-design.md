
#### spring-plugin-design
- 文件扫描
```
  按照配置的路径扫描项目和node_modules下的文件
  
```
- 处理AST(抽象语法树)
```
  1: 将抽象语法树转换为类的元数据信息
  2: 通过类元数据，生成类的依赖关系（depend on）树
  3：循环依赖
```
- 已babel plugin的形式加入到编译环节
```
  1: 编译时将有被Spring Bean注解标记的类进行处理
```
