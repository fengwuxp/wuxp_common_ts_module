import {parse} from "@babel/parser";
import {File, isDecorator} from "@babel/types";
import traverse from "@babel/traverse";
// import {} from "@babel/template";


//https://github.com/styleguidist/react-docgen-typescript

/**
 * loader 入口
 * @param sourceCodeText
 */
export default function (sourceCodeText: string) {


    const file: File = parse(sourceCodeText, {
        sourceType: "module",
        plugins: [
            "typescript",
            "classProperties",
            "decorators-legacy"
        ]
    });

    traverse(file, {
        enter(path) {
            if (isDecorator(path.node, {name: "Component"})) {
                console.log(path.node)
            }
        }
    });


    return sourceCodeText;

}