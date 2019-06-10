

/**
 * code generator
 */
export interface CodeGenerator<T = any> {

    generator: (...args) => T;
}

export interface CodeGeneratorOptions {

    //文件的输出目录，相对与项目的src路径
    //default .spring
    outputPath?: string;

    //输出的文件名称
    outputFilename?: string;

    //项目根路径
    projectBasePath: string;
}