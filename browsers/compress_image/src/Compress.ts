import {genPhoto} from "./core/photo";
import Base64 from "./core/base64";
import Converter from "./core/converter";
import Image from "./core/image";
import Rotate from "./core/rotate";
import {fileToBase64} from "fengwuxp_common_utils/src/codec/FileConverterUtil";


/**
 * 图片压缩的输出
 */
interface CompressOutput {
    /**
     * 压缩后的图片的base64的数据
     */
    data: string;

    /**
     * 图片的base64数据的前缀
     * 例如：data:jpeg;base64
     */
    prefix: string;

    elapsedTimeInSeconds: number;

    alt: string,

    initialSizeInMb: string,

    endSizeInMb: string;

    ext: string;

    quality: number;

    endWidthInPx: number;

    endHeightInPx: number;

    initialWidthInPx: number;

    initialHeightInPx: number;

    sizeReducedInPercent: number;

    iterations: number;
}

export interface CompressOptions {

    /**
     * 压缩质量
     * 默认：0.5
     */
    quality?: number;

    /**
     * 最小压缩质量
     * 默认：0.3
     */
    minQuality?: number;


    /**
     * 压缩后的最大尺寸 单位 MB
     * 默认：0.6
     */
    size?: number;

    /**
     * 压缩后的最大尺寸
     * 默认：图片宽度 *  quality
     */
    maxWidth?: number;

    /**
     * 压缩后的最大高度
     * 默认：图片高度 *  quality
     */
    maxHeight?: number;

    /**
     * 是否进行大小调整
     * 默认 false
     */
    resize?: boolean;

    /**
     * 压缩的最新误差大小
     * 默认 10kb
     */
    minimumErrorSize?: number
}

/**
 * 压缩图片
 *
 * Supported input formats
 * image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/x-icon,  image/svg+xml, image/webp, image/xxx
 * image/png, image/jpeg, image/webp
 */
export class Compress {


    /**
     *
     * @param el       input[type='file']的选择器
     * @param options  压缩配置
     */
    attach = (el: string, options: CompressOptions): Promise<CompressOutput[]> => {
        return new Promise<CompressOutput[]>((resolve, reject) => {
            const input: HTMLInputElement = document.querySelector(el);
            input.setAttribute('accept', 'image/*');
            input.addEventListener('change', (evt) => {
                const output = this.compress(convertFileListToArray((evt.target as HTMLInputElement).files), options);
                resolve(output)
            }, false);
        })
    };

    /**
     * 图片压缩
     * @param files    文件列表
     * @param options  压缩配置
     */
    compress = (files: File[], options: CompressOptions): Promise<CompressOutput[]> => {

        function compressFile(file, options) {
            // Create a new photo object
            const photo = genPhoto(options);
            photo.start = window.performance.now();
            photo.alt = file.name;
            photo.ext = file.type.split("/")[1] || "";
            photo.startSize = file.size;

            return Rotate.orientation(file)
                .then((orientation) => {
                    photo.orientation = orientation;
                    return fileToBase64(file);
                }).then(compressImage(photo));
        }

        function compressImage(photo) {
            return (src) => {
                return Image.load(src).then((img) => {
                    // Store the initial dimensions
                    photo.startWidth = img.naturalWidth;
                    photo.startHeight = img.naturalHeight;
                    // Resize the image
                    if (photo.resize) {
                        if (photo.maxWidth == null) {
                            photo.maxWidth = photo.startWidth * photo.quality;
                        }
                        if (photo.maxHeight == null) {
                            photo.maxHeight = photo.startHeight * photo.quality;
                        }
                        const {width, height} = Image.resize(photo.maxWidth, photo.maxHeight)(img.naturalWidth, img.naturalHeight);
                        photo.endWidth = width;
                        photo.endHeight = height
                    } else {
                        photo.endWidth = img.naturalWidth;
                        photo.endHeight = img.naturalHeight
                    }
                    return Converter.imageToCanvas(photo.endWidth, photo.endHeight, photo.orientation)(img)
                }).then((canvas) => {
                    photo.iterations = 1;
                    // Base64.mime(Converter.canvasToBase64(canvas))
                    photo.base64prefix = Base64.prefix(photo.ext);
                    if (photo.startSize <= photo.size) {
                        //小于需要压缩的阈值
                        return Converter.canvasToBase64(canvas);
                    }
                    return loopCompression(canvas, photo.startSize, photo.quality, photo.size, photo.minQuality, photo.iterations, photo.minimumErrorSize)
                }).then((base64) => {
                    photo.finalSize = Base64.size(base64);
                    return Base64.data(base64)
                }).then((data) => {
                    photo.end = window.performance.now();
                    const difference = photo.end - photo.start;// in ms

                    // console.log(`data:jpeg;base64,${data}`);
                    return {
                        data: data,
                        prefix: photo.base64prefix,
                        elapsedTimeInSeconds: difference / 1000, // in seconds
                        alt: photo.alt,
                        initialSizeInMb: Converter.size(photo.startSize).MB,
                        endSizeInMb: Converter.size(photo.finalSize).MB,
                        ext: photo.ext,
                        quality: photo.quality,
                        endWidthInPx: photo.endWidth,
                        endHeightInPx: photo.endHeight,
                        initialWidthInPx: photo.startWidth,
                        initialHeightInPx: photo.startHeight,
                        sizeReducedInPercent: (photo.startSize - photo.finalSize) / photo.startSize * 100,
                        iterations: photo.iterations
                    }
                })
            }
        }

        /**
         * 循环压缩
         * @param canvas
         * @param size               当前大小
         * @param quality            压缩质量
         * @param targetSize         目标大小
         * @param targetQuality      目标的压缩质量
         * @param iterations         循环压缩的次数
         * @param minimumErrorSize   压缩的最小误差
         */
        function loopCompression(canvas, size, quality = 1, targetSize, targetQuality = 1, iterations, minimumErrorSize: number) {
            const base64str = Converter.canvasToBase64(canvas, quality);
            // console.log("iterations压缩次数", iterations, size, quality, targetSize, targetQuality);
            const newSize = Base64.size(base64str);
            if (iterations === 20) {
                return base64str;
            }

            //如果压缩质量小于等0.1 或压缩的大小在目标压缩大小的最小误差值以内
            if (quality <= 0.1 || newSize <= (size + minimumErrorSize)) {
                return base64str;
            }

            iterations += 1;
            // add in iteration count
            if (newSize > targetSize) {
                return loopCompression(canvas, newSize, quality / 1.1, targetSize, targetQuality, iterations, minimumErrorSize);
            }

            if (quality > targetQuality) {
                return loopCompression(canvas, newSize, quality / 1.1, targetSize, targetQuality, iterations, minimumErrorSize);
            }


            return base64str
        }

        return Promise.all(files.map((file) => {
            return compressFile(file, options);
        })) as any
    };

}


export const convertFileListToArray = (flies: FileList) => {

    if (flies == null) {
        return []
    }

    let len = flies.length, i = 0;
    const result = [];
    while (i < len) {
        result.push(flies.item(i));
        i++;
    }

    return result;

};

/**
 * 将base64的图片数据转换为Blob对象
 * @param base64
 * @param mime  MIME 类型
 */
export const convertBase64ToFile = (base64: string, mime?: string): Blob => {
    return Converter.base64ToFile(base64, mime);
};
