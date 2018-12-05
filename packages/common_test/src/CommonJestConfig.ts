import InitialOptions = jest.InitialOptions;


/**
 * 通用的jest测试初始化配置
 */

export const jestConfig: InitialOptions = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};