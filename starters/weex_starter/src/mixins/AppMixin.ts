import {ComponentOptions} from "vue";
import {Vue} from "vue/types/vue";
import {transferViewState} from "common_weex/src/utils/views/PageStatTransferUtil";
import {argumentsResolve} from "common_weex/src/route/WeexNavigatorAdapter";
import weexDefaultSessionManager from "../session/WeexDefaultSessionManager";
import AppRouter from "../route/AppRouter";


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
            appRouter: AppRouter
        }
    },
    methods: {
        toView(pathname: string, params) {
            return AppRouter.toView({
                pathname,
                state: params
            });
        },
        back() {
            AppRouter.back();
        }
    },


    mounted() {

    },

    async beforeMount() {


        //初始化页面state
        const state = await transferViewState();
        // 获取url参数
        const urlParams = argumentsResolve.parseArguments(weex.config.bundleUrl, true);
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
        this.onReady && this.onReady()

    },
    created() {

    }
};

/**
 * 设置参数到vue的实例中
 * @param vueInstance
 * @param params
 */
function setParameterToVueInstance(vueInstance: Vue, ...params) {

    params.forEach((item) => {
        if (item == null) {
            return;
        }
        for (const key in item) {
            vueInstance[key] = item[key];
        }
    })


}

export default appMixin;
