import {Compress, convertFileListToArray} from "compress_image";


const compress = new Compress();


/**
 * 基于浏览器的图片选择
 *
 * 图片上传的处理组件使用者传入
 */
export default {


    props: {},

    data() {

        return {
            changeCount: 0
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
                size: 0.3,
                resize: true
            }).then((resultList) => {
                //上传
                this.handleUpload(resultList.map(item => item.data));
            });
        },

        /**
         * web 端文件上传
         * @param base64Data
         * @param index
         */
        uploadFile(base64Data, index) {

        },
    },
    beforeMount() {
        //web 端需要外部传入


    }
}