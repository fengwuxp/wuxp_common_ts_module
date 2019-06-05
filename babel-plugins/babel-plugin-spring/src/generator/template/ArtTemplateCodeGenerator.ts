import {CodeGenerator} from "../CodeGenerator";
import template from "art-template";
import * as path from "path";
import * as fs from "fs";

template.defaults.loader = (filepath: string, options) => {

    return fs.readFileSync(filepath, "utf-8");

};

export default class ArtTemplateCodeGenerator implements CodeGenerator {

    private templateBaseDir: string;


    constructor(templateBaseDir?: string) {
        this.templateBaseDir = templateBaseDir || path.join(__dirname, "../../resources/");
    }

    generator = (temmplate: string, data: any) => {
        const code = template(this.templateBaseDir + temmplate, data);
        return code;
    };


}