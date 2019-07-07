// import getRollupConfig from "typescript-spring-rollup";
//
// export default getRollupConfig({
//     input: 'src/index.ts',
//     output: {
//         file: 'index.js',
//         format: 'esm',
//         sourcemap: true
//     }
// });

import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import json from "rollup-plugin-json";
import replace from "rollup-plugin-replace";
import typescript from "rollup-plugin-typescript";
import uglify from "rollup-plugin-uglify";


const DEFAULT_ROLLUP_OPTIONS = {

    plugins: [
        typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
        resolve({
            // 该属性是指定将Node包转换为ES2015模块
            jsnext: true,
            // main 和 browser 属性将使插件决定将那些文件应用到bundle中
            // Default: true
            main: true,
            // Default: false
            browser: true
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

export default {
    input: 'src/index.ts',
    output: {
        file: 'lib/index.js',
        format: 'esm',
        sourcemap: true
    },
    ...DEFAULT_ROLLUP_OPTIONS
}