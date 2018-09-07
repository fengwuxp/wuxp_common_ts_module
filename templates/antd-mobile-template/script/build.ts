import {spawnSync} from "child_process";

let args="rm -rf ./dist &&  cross-env TS_NODE_PROJECT='./tsconfig-for-webpack-config.json' _self=1 webpack --config ./webpack.config.js  --progress --colors";

spawnSync(args);
