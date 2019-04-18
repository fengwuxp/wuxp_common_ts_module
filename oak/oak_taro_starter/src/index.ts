import "common_fetch/src/fetch.promise";
import {Feign} from "common_fetch/src/annotations/Feign";
import {RequestMapping} from "common_fetch/src/annotations/mapping/RequestMapping";
import {PostMapping} from "common_fetch/src/annotations/mapping/PostMapping";
import {DeleteMapping} from "common_fetch/src/annotations/mapping/DeleteMapping";
import {GetMapping} from "common_fetch/src/annotations/mapping/GetMapping";
import {PutMapping} from "common_fetch/src/annotations/mapping/PutMapping";
import {FetchRetry} from "common_fetch/src/annotations/retry/FetchRetry";
import {Signature} from "common_fetch/src/annotations/security/Signature";
import {RequestMethod} from "common_fetch/src/constant/RequestMethod";
import OAKTaroFeignProxyInitializer from "./fetch/OAKTaroFeignProxyInitializer";


import {FetchOptions} from "common_fetch/src/FetchOptions";
import {FetchRetryOptions, RetryOptions} from "common_fetch/src/FetchRetryOptions";
import TaroJsHolder from "taro_starter/src/TaroJsHolder";

/*-------------------------------------------------------------*/
import taroDefaultSessionManager from "taro_starter/src/session/TaroDefaultSessionManager";
import TaroLocalStorage from "taro_starter/src/storage/TaroLocalStorage";
import {TaroNavigatorAdapter} from "taro_starter/src/route/TaroNavigatorAdapter";
import TaroAppRouterHelper, {ViewRouteState} from "taro_starter/src/route/TaroAppRouterHelper";
import {getAppletImageResourceUrl, getAppletFontResourceUrl} from "taro_starter/src/resources/ResourcePathParser";


export {
    Feign,
    FetchOptions,
    FetchRetryOptions,
    RetryOptions,
    RequestMapping,
    PostMapping,
    DeleteMapping,
    GetMapping,
    PutMapping,
    FetchRetry,
    Signature,
    RequestMethod,

    OAKTaroFeignProxyInitializer,
    TaroLocalStorage,
    taroDefaultSessionManager,
    TaroNavigatorAdapter,
    TaroAppRouterHelper,
    TaroJsHolder,
    ViewRouteState,
    getAppletImageResourceUrl,
    getAppletFontResourceUrl
}