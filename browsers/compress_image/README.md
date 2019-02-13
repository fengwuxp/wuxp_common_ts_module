
#### 图片压缩

[代码来源于compress.js](https://github.com/alextanhongpin/compress.js)，

- 把原本js的代码转换为ts
- 这是一个基于canvas的图片压缩库，并修复了移动端即时拍照上传时图片倒转等问题。


#### example

```
   import {Compress} from "compress_image"
   
   const compress=new Compress();
   
   compress.compress({
      quality : 0.4,
      size: 0.4
   }).then((result)=>{
  
       //...do something
   });
   
```