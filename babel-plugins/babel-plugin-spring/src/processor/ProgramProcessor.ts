
import {
    Program
} from "@babel/types";


export interface ProgramProcessor {

    process: (program: Program) => void;
}