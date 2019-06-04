import {parse} from "@babel/parser";
import types from "@babel/types";
import {parse} from "@babel/parser";
import {
    File,
    Node,
    ClassBody,
    Decorator,
    isDecorator,
    isIdentifier,
    isImportSpecifier,
    isCallExpression,
    isClassDeclaration
} from "@babel/types";
import traverse from "@babel/traverse";
import template from "@babel/template";

export default function ({types: t}) {


    const Program = {
        enter(path) {
            const node: Node = path.node;
            if (isClassDeclaration(node)) {

                const decorators: Array<Decorator> = node.decorators;
                const body: ClassBody = node.body;
                const typeParameters = node.typeParameters;
                const superClass = node.superClass;
                const superTypeParameters = node.superTypeParameters;
                const type = node.type;
                const implements = node.implements;

            }
        },
        exit() {

        }
    };
    const ret = {
        visitor: {Program}
    };

    return ret;
}