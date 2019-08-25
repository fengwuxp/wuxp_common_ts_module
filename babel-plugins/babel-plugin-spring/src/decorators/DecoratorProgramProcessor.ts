import {ProgramProcessor} from "../processor/ProgramProcessor";
import {
    Program,
    BaseNode
} from "@babel/types";

/**
 * decorator program processor
 */
export interface DecoratorProgramProcessor extends ProgramProcessor {


    /**
     * 从节点上移除注解
     * @param node
     */
    remove: (node: BaseNode) => void;


    /**
     * 从节点上插入注解
     * @param node
     * @param index 默认 0
     */
    insert: (node: BaseNode, index?: number) => void;
}
