
import {
    Program
} from "@babel/types";


export interface ProgramProcessor {

    /**
     * 处理 code 端
     * @param program
     */
    process: (program: Program) => void;
}