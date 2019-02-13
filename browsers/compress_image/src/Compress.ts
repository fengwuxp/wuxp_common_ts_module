import {genPhoto} from "./core/photo";
import Base64 from "./core/base64";
import Converter from "./core/converter";
import File from "./core/file";
import Image from "./core/image";
import Rotate from "./core/rotate";


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
     * 压缩率
     */
    quality: number;

    /**
     * 压缩后的最大尺寸 单位 MB
     */
    size: number;

    /**
     * 压缩后的最大尺寸
     */
    maxWidth: number;

    /**
     * 压缩后的最大高度
     */
    maxHeight: number;

    /**
     * 是否进行大小调整
     * 默认 false
     */
    resize?: boolean;
}

/**
 * 压缩图片
 *
 * Supported input formats
 * image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/x-icon,  image/svg+xml, image/webp, image/xxx
 * image/png, image/jpeg, image/webp
 */
export default class Compress {

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
                const output = this.compress([...((evt.target as HTMLInputElement).files) as any], options);
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
            photo.ext = file.type;
            photo.startSize = file.size;

            return Rotate.orientation(file)
                .then((orientation) => {
                    photo.orientation = orientation;
                    return File.load(file)
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
                    return loopCompression(canvas, photo.startSize, photo.quality, photo.size, photo.minQuality, photo.iterations)
                }).then((base64) => {
                    photo.finalSize = Base64.size(base64);
                    return Base64.data(base64)
                }).then((data) => {
                    photo.end = window.performance.now();
                    const difference = photo.end - photo.start;// in ms

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

        function loopCompression(canvas, size, quality = 1, targetSize, targetQuality = 1, iterations) {
            const base64str = Converter.canvasToBase64(canvas, quality);
            const newSize = Base64.size(base64str);
            // const base64str = convertCanvasToBase64(src)
            // const size = getFileSize(base64str);
            iterations += 1;
            // add in iteration count
            if (newSize > targetSize) {
                return loopCompression(canvas, newSize, quality - 0.1, targetSize, targetQuality, iterations)
            }

            if (quality > targetQuality) {
                return loopCompression(canvas, newSize, quality - 0.1, targetSize, targetQuality, iterations)
            }

            if (quality < 0.5) {
                return base64str
            }
            return base64str
        }

        return Promise.all(files.map((file) => {
            return compressFile(file, options);
        })) as any
    };


}

/**
 * 将base64的图片数据转换为Blob对象
 * @param base64
 * @param mime  MIME 类型
 */
export const convertBase64ToFile = (base64: string, mime?: string): Blob => {
    return Converter.base64ToFile(base64, mime);
};