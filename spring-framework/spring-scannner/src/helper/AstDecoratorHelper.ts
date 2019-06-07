import {
    File,
    BaseNode,
    Decorator,
    ClassDeclaration,
    ImportDeclaration,
    CallExpression,
    isExportDefaultDeclaration,
    isClassDeclaration,
    isImportDeclaration
} from "@babel/types";


const REACT_VIEW_DECORATOR_PACKAGE_NAME = "typescript-spring-react/src/route/ReactView";

/**
 * 是否为 ReactView decorator
 * @param file
 */
export const hasReactViewDecorator = (file: File) => {


    return getReactViewDecorator(file) != null;

};

/**
 * 获取 ReactView的注解
 * @link typescript-spring-react/src/route/ReactView
 * @param file
 */
export const getReactViewDecorator = (file: File) => {

    return getFileDecorator(file, REACT_VIEW_DECORATOR_PACKAGE_NAME);
};


/**
 * 获取类上的注解
 * @param file
 * @param packageName 注解的包名
 */
export const getFileDecorator = (file: File, packageName: string): Decorator => {
    const program = file.program;
    const statements: BaseNode[] = program.body;

    const importReactViewDecorator: ImportDeclaration = statements.filter((node) => {
        return isImportDeclaration(node);
    }).find((node: ImportDeclaration) => node.source.value === packageName) as ImportDeclaration;

    const decoratorName = importReactViewDecorator.specifiers[0].local.name;

    const classDeclaration: ClassDeclaration = statements.filter((node) => {
        return isExportDefaultDeclaration(node)
    }).map((node: any) => {
        return node.declaration;
    }).find((node: any) => isClassDeclaration(node)) as ClassDeclaration;

    if (classDeclaration == null) {
        return null;
    }
    const decorators = classDeclaration.decorators;
    if (decorators == null || decorators.length == 0) {
        return null;
    }

    return decorators.find((item) => {
        return (item.expression as CallExpression).callee["name"] === decoratorName;
    });
};