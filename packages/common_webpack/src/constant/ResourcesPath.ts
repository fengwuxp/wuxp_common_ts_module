import * as path from "path";
import {existsSync} from "fs";

const themeJSONFilePath = path.resolve("./theme/AppTheme.json");

/**
 * 默认的样式主题变量文件
 * 支持js文件和json文件
 */
export const DEFAULT_THEME_PATH = existsSync(themeJSONFilePath) ? themeJSONFilePath : path.resolve("./theme/AppTheme.js");
