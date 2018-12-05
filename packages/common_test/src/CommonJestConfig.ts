import InitialOptions = jest.InitialOptions;


/**
 * 通用的jest测试初始化配置
 */

export const jestConfig: InitialOptions = {
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