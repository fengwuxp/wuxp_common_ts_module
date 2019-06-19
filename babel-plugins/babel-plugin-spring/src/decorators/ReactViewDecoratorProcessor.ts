import {
    Program,
    BaseNode
} from "@babel/types";
import {getProgramDecorator} from "typescript-spring-scannner/lib/helper/AstDecoratorHelper";
import {REACT_VIEW_DECORATOR_PACKAGE_NAME} from "typescript-spring-scannner/lib/constant/DecoratorPackageConstantVar";
import {DecoratorProgramProcessor} from "./DecoratorProgramProcessor";
import {removeProgramDecorator} from "../helper/DecoratorHelper";


/**
 * 对有 ReactView装饰器的类进行处理
 * @link  node_modules/typescript-spring-react/src/route/ReactView.ts
 */
export default class ReactViewDecoratorProcessor implements DecoratorProgramProcessor {


    process = (program: Program) => {
        const decorator = getProgramDecorator(program, REACT_VIEW_DECORATOR_PACKAGE_NAME);
        if (decorator == null) {
            return;
        }
        this.remove(program);
    };

    insert = (node: BaseNode, index?: number) => {

    };

    remove = (node: Program) => {
        removeProgramDecorator(node, {
            decoratorPackageName: REACT_VIEW_DECORATOR_PACKAGE_NAME
        });
    };


}