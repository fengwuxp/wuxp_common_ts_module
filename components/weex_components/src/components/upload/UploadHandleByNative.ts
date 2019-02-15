import {weexToast} from "common_weex/src/toast/WeexToast";
import {isIos, isWeb} from "common_weex/src/constant/WeexEnv";

const photo: any = weex.requireModule('photo');
const appMain: any = weex.requireModule("appMain");

const actionSheet: any = weex.requireModule('actionSheet');
const nat_network_transfer: any = weex.requireModule('nat_network_transfer');


/**
 * 针对ios下boolean转换失败的处理 返回0 或 1
 * @param flag
 * @return {*}
 */
const booleanConvert = (flag) => {
    if (!isIos) {
        return flag;
    }
    return flag ? 1 : 0;
};
const ACTION_SHEET_LIST = [
    {'type': 0, 'message': '拍照'},
    {'type': 0, 'message': '从相册取'},
    {'type': 1, 'message': '取消'}
];

/**
 * 原生上传处理者
 */
export default {


    methods: {

        /**
         * 打开选择图片的面板
         **/
        openChoosePlan() {
            if (this.uploadStep !== 0) {
                return;
            }
            //在原生环境下先选择图片
            //http://natjs.com/#/reference/media/image
            actionSheet.create({
                items: ACTION_SHEET_LIST,
                title: '提示',
                message: '请选择'
            }, (ret) => {
                this.onChooseFile(ret);
            });
        },


        /**
         * 发生文件选择
         */
        onChooseFile(ret) {
            const result = ret.result;
            if (result !== 'success') {
                console.log("图片选择或拍照失败");
                return;
            }
            const {message, index} = ret.data;
            if (index > 1) {
                console.log("取消");
                return;
            }
            const proportion: any = {};
            if (this.proportion.length === 0) {
                //表示不限制
            } else {
                //ios 支持 1：1   4：3   16：9
                proportion.aspectX = this.proportion[0];
                proportion.aspectY = this.proportion[1]
            }
            const {aspectX, aspectY} = proportion;
            photo.capture(booleanConvert(index === 0), booleanConvert(this.crop),
                {
                    aspectX: aspectX,
                    aspectY: aspectY,
                    requireBase64: typeof this.handleUpload === "function"
                }, (data) => {
                    if (data === undefined || data === null) {
                        weexToast("图片选择出现异常");
                        return;
                    }
                    if (data.toString().toLowerCase().indexOf("p:") === 0) {
                        //表示进度信息
                        appMain.showProgressBar(20);
                        return;
                    }
                    if (data.constructor !== Array) {
                        data = [data];
                    }

                    this.handleUpload(data);

                }, (message) => {
                    weexToast(message);
                });
        },

        /**
         * 基于原生的自动上传图片
         * @param filePath
         */
        uploadFile(filePath, index) {

            appMain.showProgressBar(20);
            this.uploadStep = 1;

            return new Promise((resolve, reject) => {

                nat_network_transfer.upload({
                    url: process.env.PIC_SERVICE_URL,
                    path: filePath
                }, (result) => {
                    const {data, ok, progress} = result;
                    if (progress) {
                        return;
                    }
                    appMain.hideProgressBar();
                    if (!ok) {
                        reject("上传失败");
                        return;
                    }
                    if (data == null) {
                        reject("上传无结果");
                        return;
                    }
                    const resp = JSON.parse(data);
                    const {url} = resp;
                    resolve({
                        orderNumber: this.orderNumber,
                        url: process.env.PIC_SERVICE_DOMAIN + url
                    });
                });
            })

        },


    }
}