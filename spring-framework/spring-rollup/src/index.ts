import {RollupOptions} from "rollup";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import typescript from "rollup-plugin-typescript";
import uglify from "rollup-plugin-uglify";


const DEFAULT_ROLLUP_OPTIONS: RollupOptions = {

    plugins: [
        typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
        // resolve({
        //     // 该属性是指定将Node包转换为ES2015模块
        //     jsnext: true,
        //     // main 和 browser 属性将使插件决定将那些文件应用到bundle中
        //     // Default: true
        //     main: true,
        //     // Default: false
        //     browser: true
        // }),
        resolve({
            mainFields: ['module', 'main']
        }),
        commonjs(),
        json(),
        babel({
            // 排除node_modules 下的文件
            exclude: "node_modules/**"
        }),
        replace({ENV: JSON.stringify(process.env.NODE_ENV || "development")}),
        (process.env.NODE_ENV === "production" && uglify())
    ]
};


/**
 * 获取 rollup options
 * @param rollupOptions
 */
const getRollupConfig = (rollupOptions: RollupOptions) => {


    return {
        ...rollupOptions,
        ...DEFAULT_ROLLUP_OPTIONS
    }

};

export default getRollupConfig;
