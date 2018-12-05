"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 通用的测试配置
 */
exports.jestConfig = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
