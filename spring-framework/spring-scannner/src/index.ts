export interface ScannerOptions {

    /**
     * 扫描的node模块
     * 默认：[]
     */
    nodeModules?: string[];

    /**
     * 扫描的基础包名
     * 默认：["views"]
     */
    scanBasePackages?: string[];

    /**
     * 生成的代码输出跟路径
     * 相对项目目录的 src目录
     * 默认：.spring
     */
    generateOutputPath?: string;
}

export const DEFAULT_SCANNER_OPTIONS: ScannerOptions = {
    scanBasePackages: ["views"],
    nodeModules: [],
    generateOutputPath: ".spring"
};


/**
 * 包扫码入口
 * @param options
 */
export default function (options: ScannerOptions = DEFAULT_SCANNER_OPTIONS) {

}