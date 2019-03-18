import {FunctionMockRegistrar} from "./FunctionMockRegistrar";
import {FunctionMocker} from "./FunctionMocker";


class DefaultFunctionMockRegistrar implements FunctionMockRegistrar {

    private MOCKER_MAP: Map<any, FunctionMocker> = new Map();

    register = (target: any, mocker: FunctionMocker) => {

        this.MOCKER_MAP.set(target, mocker);

    };

    getMocker = <T>(target: any) => {
        return this.MOCKER_MAP.get(target) as T;
    }


}

export default new DefaultFunctionMockRegistrar();