const {jestConfig} = require("common_test/lib/CommonJestConfig");

module.exports = jestConfig;

// module.exports = {
//     transform: {
//         '^.+\\.tsx?$': 'ts-jest',
//     },
//     testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
//     moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
// };