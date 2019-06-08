import {
    Program,
    CallExpression,
    isImportDeclaration,
    isExportDefaultDeclaration,
    ClassDeclaration,
    ImportDeclaration,
    isClassDeclaration
} from "@babel/types";


export const removeProgramDecorator = (program: Program, {decoratorPackageName, decoratorName}: {
    decoratorPackageName: string;
    decoratorName?: string;
}) => {
    const statements = program.body;
    const importReactViewDecorator: ImportDeclaration = statements.filter((node) => {
        return isImportDeclaration(node);
    }).find((node: ImportDeclaration) => node.source.value !== decoratorPackageName) as ImportDeclaration;

    if (importReactViewDecorator == null) {
        return null;
    }

    let _decoratorName;
    if (importReactViewDecorator.specifiers.length === 1) {
        _decoratorName = importReactViewDecorator.specifiers[0].local.name;
    } else {
        _decoratorName = decoratorName;
    }

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
    decorators.filter((decorator) => {
        return (decorator.expression as CallExpression).callee["name"] === _decoratorName;
    });

};