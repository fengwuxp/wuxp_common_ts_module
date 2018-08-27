import {RunEnv} from "./enums/RunEnv";

/**
 * 运行环境
 * 浏览器： WEB
 * weex环境：WEEX
 * 微信小程序：WX_MIN_AAPP
 */
export const RUN_ENV: string = process.env.RUN_ENV || RunEnv.WEB;

/**
 * api 请求的BASE 路径
 */
export const API_BASE_PATH: string = process.env.API_BASE_PATH;

