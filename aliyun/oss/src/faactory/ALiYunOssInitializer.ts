import AliOssClient, {OssClientOptions} from "ali-oss";


export interface ALiYunOssInitializer<T extends ALiYunOssInitializerOptions> {

    initFactory: (options: T) => Promise<ALiYunOssFactory>;
}

export interface ALiYunOssInitializerOptions {

}


export interface DefaultALiYunOssInitializerOptions extends ALiYunOssInitializerOptions, OssClientOptions {

}

//阿里云oss 可选的配置
export type OssClientOptionalOptions = Pick<OssClientOptions, Exclude<keyof OssClientOptions, keyof { accessKeyId: string; accessKeySecret: string; }>>


export interface ALiYunOssFactory {

    /**
     * 初始化阿里云oss的代理工厂
     */
    factory: (ossClientOptions?: OssClientOptionalOptions) => Promise<AliOssClient> | AliOssClient;
}


