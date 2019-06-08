export interface SpringScannerConfig {

    /**
     * 扫描的node模块
     * 默认：[]
     */
    nodeModules?: string[];

    /**
     * 扫描的基础包名
     * 默认：["views"]
     */
    scanPackages?: string[];

    /**
     * 生成的代码输出跟路径
     * 相对项目目录的 src目录
     * 默认：.spring
     */
    generateOutputPath?: string;

    //扫描的基础路径(文件全路径)
    scanBasePath?: string;

}

export const loadYamlConfig = (fliepath?: string): SpringScannerConfig => {

    return null;
};