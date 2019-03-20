const defaultBabel7Options = require("../../babel/babelrc7");

/**
 * 获取babel7的默认配置
 * @param babel7Options
 */
export const getBabel7CommonConfig = (babel7Options = {}) => {

    return {
        ...defaultBabel7Options,
        ...babel7Options
    }
};