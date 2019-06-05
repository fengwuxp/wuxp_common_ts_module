import {
    ClassDeclaration,
    Program,
    Statement,
    ClassBody,
    Decorator,
    isDecorator,
    genericTypeAnnotation,
    isIdentifier,
    isExportDefaultDeclaration,
    isExportDeclaration,
    isImportSpecifier,
    isCallExpression,
    isClassDeclaration
} from "@babel/types";


/**
 * 是否为react view
 * @param classDeclaration
 */
export const isReactView = (classDeclaration: ClassDeclaration) => {

    const decorators = classDeclaration.decorators;
    if (decorators == null || decorators.length == 0) {
        return false;
    }

    return decorators.find((item) => {
        return item.expression["callee"].name === "ReactView";
    }) != null
};

