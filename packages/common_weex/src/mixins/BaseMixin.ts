import {ComponentOptions} from "vue";
import {Vue} from "vue/types/vue";
import {urlParameterParser} from "../utils/views/UrlParameterParser";

/**
 * 基础的mix in
 * @author wxup
 * @create 2018-10-05 17:15
 **/
const baseMixin: ComponentOptions<any> = {

    methods: {},


    mounted() {

    },
    beforeMount() {
        // 获取url参数
        const urlParams = urlParameterParser();
        //将url参数赋值到vue的实例中
        setParameterToVueInstance(urlParams, this);

        //TODO 初始化广播事件

        //TODO 初始化用户鉴权信息

        //TODO 调用onRead方法

    },
    created() {

    }
};

function setParameterToVueInstance(urlParams: object, vueInstance: Vue) {
    for (const key in urlParams) {
        vueInstance[key] = urlParams[key];
    }
}

export default baseMixin;
