import {Registry} from "common_core/src/registry/Registry";
import {History} from "history";


class HistoryRegistry implements Registry<History> {

    protected history: History;

    get = () => this.history;

    register = (history: History) => {
        if (this.history == null) {
            this.history = history;
        }
    };
}

const historyRegistry = new HistoryRegistry();

export default historyRegistry;