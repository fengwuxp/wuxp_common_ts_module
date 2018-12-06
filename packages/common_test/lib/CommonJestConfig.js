"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 通用的jest测试初始化配置
 */
exports.jestConfig = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/test/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|ts?)$',
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverage: true,
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.test.json',
        },
    }
};
