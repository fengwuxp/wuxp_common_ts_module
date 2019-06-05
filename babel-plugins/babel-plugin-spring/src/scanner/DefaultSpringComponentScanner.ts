import {SpringComponentScanner} from "./SpringComponentScanner";
import {
    File,
    Node,
    ClassDeclaration,
    ClassBody,
    Decorator,
    isDecorator,
    isIdentifier,
    isImportSpecifier,
    isImportDeclaration,
    isCallExpression,
    isClassDeclaration
} from "@babel/types";

export default class DefaultSpringComponentScanner implements SpringComponentScanner {

    scanning = (path) => {

        const node: ClassDeclaration = path.node;

        const decorators: Array<Decorator> = node.decorators;


    };


}