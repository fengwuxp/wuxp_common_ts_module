import {FileUploadOptions, FileUploadStrategy} from "./FileTransmitter";

type CacheResult = {
    url: string,
    timestamp: number
};
/**
 * 带缓存的抽象的 文件上传策略
 *
 * 会将文件的上传结果缓存一段时间，如果下次再次上传这个文件会先从缓存列表中返回
 */
export default abstract class AbstractCacheFileUploadStrategy implements FileUploadStrategy {


    //缓存上传的结果
    private static CACHE_UPLOAD_RESULT: Map<string, CacheResult> = new Map();

    //检查间隔 默认3分钟
    private inspectionInterval: number;

    //最大的保存时间 默认6分钟
    private maxTimes: number;


    constructor(inspectionInterval?: number, maxTimes?: number) {
        this.inspectionInterval = inspectionInterval || 3 * 60 * 1000;
        this.maxTimes = maxTimes || 6 * 60 * 1000;
        this.autoClearCache();
    }

    upload = (options: FileUploadOptions): Promise<string> => {

        const file = options.data;

        //如果上传的是文件对象或者base64字符串尝试先从缓存中获取
        if (file.constructor === File || file.constructor === String) {
            const url = this.findUploadResultByCache(file as any);
            if (url != null) {
                return Promise.resolve(url);
            }
        }
        return this.uploadFile(options);


    };

    /**
     * 上传文件
     */
    protected abstract uploadFile: (options: FileUploadOptions) => Promise<string>;


    private findUploadResultByCache = (file: File | string): string => {
        const result = AbstractCacheFileUploadStrategy.CACHE_UPLOAD_RESULT.get(this.genKey(file));
        if (result != null) {
            return result.url;
        }
        return null;

    };

    private genKey = (file: File | string): string => {
        if (typeof file === "string") {
            return file;
        }

        return `${file.name}_${file.lastModified}_${file.size}`;
    };

    private autoClearCache = () => {
        setTimeout(() => {
            const result: Map<string, CacheResult> = new Map();
            const times = new Date().getTime();
            AbstractCacheFileUploadStrategy.CACHE_UPLOAD_RESULT.forEach((value, key, map) => {
                if (times - value.timestamp < this.maxTimes) {
                }
                result.set(key, value);
            });
            AbstractCacheFileUploadStrategy.CACHE_UPLOAD_RESULT = result;
        }, this.inspectionInterval);
    }

}