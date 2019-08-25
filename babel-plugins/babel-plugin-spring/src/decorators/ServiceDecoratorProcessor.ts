import {DecoratorProgramProcessor} from "./DecoratorProgramProcessor";
import { BaseNode, Program } from "@babel/types";


export default class ServiceDecoratorProcessor implements DecoratorProgramProcessor{
    insert: (node: BaseNode, index?: number) => void;
    process: (program: Program) => void;
    remove: (node: BaseNode) => void;



}
