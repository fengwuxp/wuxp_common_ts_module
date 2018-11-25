import {Registry} from "common_core/src/registry/Registry";
import {AppContext} from "./AppContext";


class AppContextRegistry implements Registry<AppContext>{



    get: (...args) => AppContext;

    register: (...args) => any;



}