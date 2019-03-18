import {FindMockerStrategy, FunctionMockRegistrar} from "./FunctionMockRegistrar";
import {FunctionMocker} from "./FunctionMocker";
import {defaultFindMockerStrategy} from "./DefaultFindMockerStrategy";


class DefaultFunctionMockRegistrar implements FunctionMockRegistrar {


    private MOCKER: Set<any> = new Set();

    registerMocker = (mocker: FunctionMocker) => {
        this.MOCKER.add(mocker);
    };

    getMocker = <T>(target: T, findMockerStrategy: FindMockerStrategy<T> = defaultFindMockerStrategy): T => {
        return findMockerStrategy(target, this.MOCKER);
    }


}

export default new DefaultFunctionMockRegistrar();