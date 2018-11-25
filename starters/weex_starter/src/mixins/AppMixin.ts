import {ComponentOptions} from "vue";
import {Vue} from "vue/types/vue";
import {transferViewState} from "common_weex/src/utils/views/PageStatTransferUtil";
import {isIos, isAndroid, isIphoneX, isWeb} from "common_weex/src/constant/WeexEnvUtil";
import {argumentsResolve} from "common_weex/src/route/WeexNavigatorAdapter";


//默认宽度
const DEFAULT_WIDTH = 750.0;

/**
 * 基础的mix in
 * @author wxup
 * @create 2018-10-05 17:15
 **/
const appMixin: ComponentOptions<any> = {

    data() {
        const deviceWidth = weex.config.env.deviceWidth;
        const deviceHeight = weex.config.env.deviceHeight;

        const rpx = deviceWidth / DEFAULT_WIDTH;
        return {
            deviceWidth,
            deviceHeight,
            rpx,
            //客户端版本代码
            appVersionCode: -1
        }
    },
    methods: {
        jump(uri){

        }
    },


    mounted() {

    },
    beforeMount() {
        // 获取url参数
        const urlParams = argumentsResolve.parseArguments(weex.config.bundleUrl, true);
        //将url参数赋值到vue的实例中
        setParameterToVueInstance(urlParams, this);

        //初始化页面state
        transferViewState().then((state) => {
            if (state == null) {
                return;
            }
            setParameterToVueInstance(state, this);
        });

        //TODO 获取APP版本信息

        //TODO 初始化广播事件

        //TODO 初始化用户鉴权信息

        //TODO 调用onRead方法

    },
    created() {

    }
};

/**
 * 设置参数到vue的实例中
 * @param urlParams
 * @param vueInstance
 */
function setParameterToVueInstance(urlParams: object, vueInstance: Vue) {
    for (const key in urlParams) {
        vueInstance[key] = urlParams[key];
    }
}

export default appMixin;
