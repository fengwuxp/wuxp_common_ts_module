


export interface SpringWebpackConfiguration {

    /**
     * 静态资源根路径
     * default "./"
     */
    staticResourcesBasePath?: string;

    /**
     * 默认输出目录
     * 相对与 src
     * default "../dist"
     */
    outputPath?: string;


    /**
     * default "/"
     */
    publicPath?: string;

    /**
     * default development
     */
    mode?: "development" | "production" | "none";


    externals?: {
        [K: string]: string
    }
}