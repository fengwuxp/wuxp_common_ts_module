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
import {FetchInterceptor} from "common_fetch/src/interceptor/FetchInterceptor";
import FetchInterceptorExecutor from "common_fetch/src/interceptor/FetchInterceptorExecutor";
import {FetchResponse} from "common_fetch/src/FetchOptions";
import AbstractFetchInterceptor from "common_fetch/src/interceptor/AbstractFetchInterceptor";
import {AbstractSyncAuthHelper, RefreshTokenResult} from "common_fetch/src/interceptor/default/AbstractSyncAuthHelper";
import {RestTemplate} from "common_fetch/src/template/RestTemplate";
import {MediaType} from "common_fetch/src/constant/http/MediaType";
import OAKTaroFeignProxyInitializer from "./src/fetch/OAKTaroFeignProxyInitializer";
import {FetchOptions} from "common_fetch/src/FetchOptions";
import {FetchRetryOptions, RetryOptions} from "common_fetch/src/FetchRetryOptions";
import TaroJsHolder from "taro_starter/src/TaroJsHolder";
import taroDefaultSessionManager from "taro_starter/src/session/TaroDefaultSessionManager";
import TaroLocalStorage from "taro_starter/src/storage/TaroLocalStorage";
import {TaroNavigatorAdapter} from "taro_starter/src/route/TaroNavigatorAdapter";
import TaroAppRouterHelper, {ViewRouteState} from "taro_starter/src/route/TaroAppRouterHelper";
import {getAppletImageResourceUrl, getAppletFontResourceUrl} from "taro_starter/src/resources/ResourcePathParser";
import {showToast} from "./src/toast/WeChatAppletsToast";

export {
    FetchInterceptor,
    AbstractFetchInterceptor,
    FetchInterceptorExecutor,
    AbstractSyncAuthHelper,
    RefreshTokenResult,
    FetchOptions,
    FetchRetryOptions,
    RetryOptions,
    FetchResponse,
    RestTemplate,
    Feign,
    RequestMapping,
    PostMapping,
    DeleteMapping,
    GetMapping,
    PutMapping,
    FetchRetry,
    Signature,
    RequestMethod,
    MediaType,
    OAKTaroFeignProxyInitializer,
    TaroLocalStorage,
    taroDefaultSessionManager,
    TaroNavigatorAdapter,
    TaroAppRouterHelper,
    TaroJsHolder,
    ViewRouteState,
    getAppletImageResourceUrl,
    getAppletFontResourceUrl,
    showToast
};
