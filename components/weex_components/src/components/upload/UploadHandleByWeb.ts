import {Compress, convertFileListToArray} from "compress_image";
import {Feign} from "fengwuxp_common_fetch/src/annotations/Feign";
import {Signature} from "fengwuxp_common_fetch/src/annotations/security/Signature";
import {PostMapping} from "fengwuxp_common_fetch/src/annotations/mapping/PostMapping";
import {FetchOptions} from "fengwuxp_common_fetch/src/FetchOptions";


const compress = new Compress();

@Feign()
class SystemService {
    /**
     * 图片上传
     * @param req 请求参数
     * @param option 请求配置
     */
    @Signature({fields: []})
    @PostMapping({})
    uploadImage: (req: {
        base64Data: string,
        extName: string
    }, option?: FetchOptions) => Promise<string>;
}

const systemService = new SystemService();

/**
 * 基于浏览器的图片选择
 *
 * 图片上传的处理组件使用者传入
 */
export default {


    props: {},

    data() {

        return {
            changeCount: 0,
            extNames: []
        }
    },

    methods: {
        /**
         * 图片选择事件
         * @param event
         */
        onChooseFile(event) {

            this.changeCount++;
            const inputElement: HTMLInputElement = event.target;
            const files: FileList = inputElement.files;
            if (files == null) {
                return;
            }
            //压缩图片
            compress.compress(convertFileListToArray(files), {
                quality: 0.3,
                //最大 0.3MB，只有大于0.3MB的图片才会进行压缩
                size: 0.3,
                resize: true
            }).then((resultList) => {
                //上传
                console.log(resultList);
                this.extNames = resultList.map(item => item.ext);
                console.log("this.extNames", this.extNames);
                this.handleUpload(resultList.map(item => item.data));
            });
        },

        /**
         * web 端文件上传
         * @param base64Data
         * @param index
         */
        uploadFile(base64Data, index) {
            //默认实现
            return systemService.uploadImage({
                base64Data,
                extName: this.extNames[index],
            }).then((url) => {
                return {
                    url,
                    orderIndex: this.orderIndex,
                }
            })
        },
    },
    beforeMount() {


    }
}
