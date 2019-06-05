import {
    ClassDeclaration,
    Program,
    Statement,
    ClassBody,
    Decorator,
    CallExpression,
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
 * 移除节点上的装饰器
 */
export const removeDecorator = (path, decorator) => {

};


/**
 * 获取类上的注解
 * @param classDeclaration
 * @param decoratorName
 */
export const getDecoratorByName = (classDeclaration: ClassDeclaration, decoratorName: string):Decorator => {

    const decorators = classDeclaration.decorators;
    if (decorators == null || decorators.length == 0) {
        return null;
    }

    return decorators.find((item) => {
        return (item.expression as CallExpression).callee["name"] === decoratorName;
    })
};