/**
 * 动画模块
 * 文档地址：https://weex.apache.org/cn/references/modules/animation.html
 */
import {WeexModule} from "../../../../index";

export interface WeexAnimationModule extends WeexModule {
    /**
     * @param ref
     * @param options
     * @param callback 是动画执行完毕之后的回调函数。在iOS平台上，你可以获取动画执行是否成功的信息。
     * 注意: 在0.16.0+版本后，iOS上可以获取animation是否执行成功的信息，callback中的result参数会有两种，分别是是Success与Fail，Android目前暂不支持。
     */
    readonly transition: (ref: any, options: WeexAnimationOptions, callback?: (result?: any) => void) => void;
}

// export interface WeexTransform {
//
//     //指定元素要移动到的位置	像素值或百分比	无
//     translate?: number;
//     translateX?: number,
//     translateY?: number,
//
//     //指定元素将被旋转的角度，单位是度	number	无
//     rotate?: number,
//     rotateX?: number,  //v0.14+
//     rotateY?: number,  //v0.14+
//
//     //按比例放大或缩小元素	number	无
//     scale?: number;
//     scaleX?: number;
//     scaleY?: number
//
//     // v0.16+	观察者距离z=0平面的距离，在Android 4.1及以上有效	number	正无穷
//     perspective?: number
//
// }

type WeexTransform=string;



export interface WeexTransitionStyle {
    width?: number;//	动画执行后应用到组件上的宽度值	length	无
    height?: number;//	动画执行后应用到组件上的高度值	length	无
    backgroundColor?: string;//	动画执行后应用到组件上的背景颜色	string	none
    opacity?: number;//	动画执行后应用到组件上的不透明度值	介于 0 到 1 间的数值	1
    transformOrigin?: string//	定义变化过程的中心点. 参数 x-aris 可能的值为 left、center、right、长度值或百分比值, 参数 y-axis 可能的值为 top、center、bottom、长度值或百分比值	x-axis y-axis	center center
    transform?: WeexTransform;	  //定义应用在元素上的变换类型，支持下表列出的属性	object	无
}

export interface WeexAnimationOptions {
    /**
     * :设置不同样式过渡效果的键值对，下表列出了所有合法的参数：
     */
    styles: WeexTransitionStyle;

    /**
     * 指定动画的持续时间 (单位是毫秒)，默认值是 0，表示没有动画效果。
     */
    duration: number;

    /**
     * 描述动画执行的速度曲线，用于使动画变化更为平滑。默认值是 linear，表示动画从开始到结束都拥有同样的速度。
     * linear    动画从头到尾的速度是相同的
     * ease    动画速度逐渐变慢
     * ease-in    动画速度由慢到快
     * ease-out    动画速度由快到慢
     * ease-in-out    动画先加速到达中间点后减速到达终点
     * cubic-bezier(x1, y1, x2, y2)    在三次贝塞尔函数中定义变化过程，函数的参数值必须处于 0 到 1 之间
     */
    timingFunction?: string;

    /**
     * 节点动画执行时是否产生布局动画即LayoutAnimation，默认值是false。
     */
    needLayout?: boolean;

    /**
     * 指定请求动画操作到执行动画之间的时间间隔 (单位是毫秒)，默认值是 0，表示没有延迟，在请求后立即执行动画。
     */
    delay?: number;
}
