import {ComponentOptions} from "vue";
import {Vue} from "vue/types/vue";
import {setNextViewState, transferViewState} from "common_weex/src/route/PageStatTransferUtil";
import {URLArgumentsResolve} from "common_weex/src/resolve/URLArgumentsResolve";
import DefaultURLArgumentsResolve from "common_weex/src/resolve/DefaultURLArgumentsResolve";
import weexDefaultSessionManager from "../session/WeexDefaultSessionManager";
import AppRouterHelper from "../route/AppRouterHelper";
import {isWeb, rpx} from "common_weex/src/constant/WeexEnv";


//使用默认的参数器解析参数
const argumentsResolve: URLArgumentsResolve = new DefaultURLArgumentsResolve();


/**
 * 基础的mix in
 * @author wxup
 * @create 2018-10-05 17:15
 **/
const appMixin: ComponentOptions<any> = {

    data() {
        return {
            //客户端版本代码
            appVersionCode: -1,
            //用户信息
            member: null,

            //页面是否准备完成
            viewIsReady: false,

            rpx
        }
    },
    methods: {
        toView: AppRouterHelper.toView,

        backView: AppRouterHelper.backView,
    },

    mounted() {

    },

    beforeMount() {

    },
    async created() {
        //初始化页面state
        const state = await transferViewState();
        // 获取url参数
        const url = isWeb ? location.href : weex.config.bundleUrl;
        const urlParams = argumentsResolve.parseArguments(url, true);
        //将url参数和页面state初始化到vue的实例中
        setParameterToVueInstance(this, state, urlParams);


        //TODO 获取APP版本信息

        //TODO 初始化广播事件


        try {
            //初始化用户鉴权信息
            this.member = await weexDefaultSessionManager.getMember();
        } catch (e) {
            console.debug("获取用户信息失败", e);
        }

        //调用页面的onReady方法
        this.onReady && await this.onReady();

        //on ready表示准备完成
        this.viewIsReady = true;

        // if (state != null) {
        //     //清空本页面的sate
        //     setNextViewState(null);
        // }
    }
};

/**
 * 设置参数到vue的实例中
 * @param vueInstance
 * @param params
 */
function setParameterToVueInstance(vueInstance: Vue, ...params) {

    params.filter((item) => {
        return item != null;
    }).forEach((item) => {

        for (const key in item) {
            if (key in vueInstance) {
                vueInstance[key] = item[key];
            }

        }
    })


}

export default appMixin;
