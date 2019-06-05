import {parse} from "@babel/parser";
import types from "@babel/types";
import {
    File,
    Node,
    ClassDeclaration,
    Program,
    Statement,
    ClassBody,
    Decorator,
    isDecorator,
    isIdentifier,
    isExportDefaultDeclaration,
    isExportDeclaration,
    isImportSpecifier,
    isCallExpression,
    isClassDeclaration,
    removeProperties
} from "@babel/types";
import traverse from "@babel/traverse";
import template from "@babel/template";
import {isReactView} from "./utils/TypeEssertionUtil";
import {getDecoratorByName} from "./helper/AstPathNodeOperateHelper";

import ReactRouteConfigGenerator from "./generator/react/ReactRouteConfigGenerator";

const reactRouteConfigGenerator = new ReactRouteConfigGenerator();

//{types: t}
export default function (babel) {


    // console.log("babel keys", Object.keys(babel));

    const Program = {
        enter(path, state) {
            const node: Program = path.node;

            // console.log(JSON.stringify(node))

            const body = node.body;

            body.forEach((statement: Statement) => {

                if (isExportDefaultDeclaration(statement)) {
                    const declaration = statement.declaration;

                    if (isClassDeclaration((declaration))) {
                        const classDeclaration = declaration as ClassDeclaration;


                        // const ReactViewDecorator = getDecoratorByName(classDeclaration, "ReactView");
                        // if (ReactViewDecorator) {
                        //     //移除掉这个标记，获取参数
                        //     // removeProperties(ReactViewDecorator);
                        //     // ReactViewDecorator.remove()
                        // }

                        reactRouteConfigGenerator.generator(classDeclaration,state);


                        const decorators: Array<Decorator> = classDeclaration.decorators;


                        const body: ClassBody = classDeclaration.body;
                    }


                    // const typeParameters = node.typeParameters;
                    // const superClass = node.superClass;
                    // const superTypeParameters = node.superTypeParameters;
                    // const type = node.type;
                    // // const implements = node.implements;
                }
            });


        },
        exit() {

        }
    };

    const result = {
        visitor: {Program}
    };

    return result;
}