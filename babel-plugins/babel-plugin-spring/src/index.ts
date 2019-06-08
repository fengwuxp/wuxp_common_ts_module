import {Program,} from "@babel/types";
import {ProgramProcessor} from "./processor/ProgramProcessor";
import ReactViewDecoratorProcessor from "./decorators/ReactViewDecoratorProcessor";


const programProcessors: ProgramProcessor[] = [
    new ReactViewDecoratorProcessor()
];

export default function (babel) {


    const Program = {
        enter(path, state) {
            const node: Program = path.node;
            programProcessors.forEach(processor => {
                processor.process(node);
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