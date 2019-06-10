import {CodeGeneratorOptions} from "./CodeGenerator";
import {LOGGER} from "../helper/Log4jsHelper";
import * as fs from "fs";


export const outputToDir = (code: string, options: CodeGeneratorOptions) => {
    const {projectBasePath, outputFilename, outputPath} = options;

    const fileOutputPath = `${projectBasePath}/${outputPath}/${outputFilename}.ts`;
    LOGGER.debug("fileOutputPath", fileOutputPath);
    fs.writeFileSync(fileOutputPath, code, {flag: "w+"});

}