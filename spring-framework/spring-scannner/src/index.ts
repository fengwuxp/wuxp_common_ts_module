export interface ScannerOptions {

    /**
     * 扫描的node模块
     * 默认：[]
     */
    nodeModules?: string[],

    /**
     * 扫描的基础包名
     * 默认：["views"]
     */
    scanBasePackages?: string[]
}

export const DEFAULT_SCANNER_OPTIONS: ScannerOptions = {
    scanBasePackages: ["views"],
    nodeModules: []
};

export default function (options?: ScannerOptions = DEFAULT_SCANNER_OPTIONS) {

}