export interface ImageLoadProps {

    /**
     * Whether the tag image was loaded successfully.
     * (标记图片是否成功加载。)
     */
    success: boolean;

    /**
     * loaded image size object, property list
     * (加载的图片大小对象，属性列表)
     */
    size: {
        /**
         * the width of the picture, 0 if the picture fails to load.
         * (图片宽度，如果图片加载失败则为0)
         */
        naturalWidth: number,

        /**
         * image height, 0 if the image failed to load
         * (图片高度，如果图片加载失败则为0)
         */
        naturalHeight: number
    }
}
