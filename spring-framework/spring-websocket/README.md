#### websocket 

#### 期望

- 能够已经接口调用的形式访问websocket server
```
 example:
   
   ExampleWebsocketService.getA({
      //参数
   }).then((data)=>{
   
   }).cache((e)=>{
   
   }).finally(()=>{
     
     
   })

```
- 对于服务端主动推下来的信息能够进行分发路由
- 支持鉴权访问策略的调整
- 支持心跳

#### 实现思路

- 定义一套基本协议，参考了腾讯开源的[mars](https://github.com/Tencent/mars)
```
  基本协议结构：
   interface WebSocketProtocol {
     //命令id ，服务端返回的必须和客户端提交的一致
     commonId:number;
     
     //序列号（针对单个连接）（消息id），服务端返回的必须和客户端提交的一致
     seq:number;
     
     //消息内容
     body:string|ArrayBuffer;
     
     //数据类型（默认和commonId一致）
     dataType?:number;
  }
  
  基本协议定义：
  默认命令id：
  

```
- 已代理的形式包装所有对websocket的访问

- 需要一个消费分发中心
```
  分发规则，需要区分主动上报，和主动下发（客户端请求，和服务端推送）
  
  1：主动上报（客户端请求）：
    1.1: 主动请求服务端后，服务端会有回复的(响应)
    
    1.2：主动请求服务端后，服务端不做回复的
  
  2：主动下发（服务端推送）：
   2.1：服务端推送消息后，要求客户端需要做ACK的（业务层面的ACK）
   
   2.2：服务端推送消息后，不需要做ACK的 

```
