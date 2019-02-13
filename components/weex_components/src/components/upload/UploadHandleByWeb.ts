/**
 * 基于浏览器的图片选择
 */
import {url} from "inspector";

export default {


    data() {

        return {
            changeCount: 0
        }
    },

    methods: {
        onChooseFile(event) {

            this.changeCount++;
            const inputElement: HTMLInputElement = event.target;
            const files: FileList = inputElement.files;
            if (files == null) {
                return;
            }

            let len = files.length, i = -1;

            const result: File[] = [...(files as any)];

            //压缩图片 compressionSize

        },

        /**
         * 上传文件
         */
        uploadFile(base64Data) {

            const reqOptions: RequestInit = {
                method: "POST",
                body: base64Data,
                cache: false,
                mode: "cors",
                credentials: "include"
            } as any;
            return fetch(new Request("", reqOptions))
                .then(() => {
                    //上传成功
                }).catch(() => {
                    //上传失败
                })
        }
    }
}