import {ComponentOptions} from "vue";
import {Vue} from "vue/types/vue";
import {transferViewState} from "common_weex/src/utils/views/PageStatTransferUtil";
import {URLArgumentsResolve} from "common_weex/src/resolve/URLArgumentsResolve";
import DefaultURLArgumentsResolve from "common_weex/src/resolve/DefaultURLArgumentsResolve";
import weexDefaultSessionManager from "../session/WeexDefaultSessionManager";
import AppRouter from "../route/AppRouter";

//使用默认的参数器解析参数
const argumentsResolve: URLArgumentsResolve = new DefaultURLArgumentsResolve();


interface ViewParams {

    /**
     * 查询参数
     */
    queryParams?: {},

    /**
     * 页面状态
     */
    state?: {}
}

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
        toView(pathname: string, viewPrams: ViewParams) {
            return AppRouter.toView({
                pathname,
                ...(viewPrams || {})
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
