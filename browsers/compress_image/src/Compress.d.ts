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
    alt: string;
    initialSizeInMb: string;
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
     * 默认：1920
     */
    maxWidth?: number;
    /**
     * 压缩后的最大高度
     * 默认：1920
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
    minimumErrorSize?: number;
}
/**
 * 压缩图片
 *
 * Supported input formats
 * image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/x-icon,  image/svg+xml, image/webp, image/xxx
 * image/png, image/jpeg, image/webp
 */
export declare class Compress {
    /**
     *
     * @param el       input[type='file']的选择器
     * @param options  压缩配置
     */
    attach: (el: string, options: CompressOptions) => Promise<CompressOutput[]>;
    /**
     * 图片压缩
     * @param files    文件列表
     * @param options  压缩配置
     */
    compress: (files: File[], options: CompressOptions) => Promise<CompressOutput[]>;
}
export declare const convertFileListToArray: (flies: FileList) => any[];
/**
 * 将base64的图片数据转换为Blob对象
 * @param base64
 * @param mime  MIME 类型
 */
export declare const convertBase64ToFile: (base64: string, mime?: string) => Blob;
export {};
