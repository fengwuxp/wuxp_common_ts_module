import "common_fetch/types/index.d.ts";
import "common_fetch/src/fetch.promise";
import {Feign} from "common_fetch/src/annotations/Feign";
import {RequestMapping} from "common_fetch/src/annotations/mapping/RequestMapping";
import {PostMapping} from "common_fetch/src/annotations/mapping/PostMapping";
import {DeleteMapping} from "common_fetch/src/annotations/mapping/DeleteMapping";
import {GetMapping} from "common_fetch/src/annotations/mapping/GetMapping";
import {PutMapping} from "common_fetch/src/annotations/mapping/PutMapping";
import {FetchRetry} from "common_fetch/src/annotations/retry/FetchRetry";
import {Signature} from "common_fetch/src/annotations/security/Signature";
import OAKTaroFeignProxyInitializer from "./fetch/OAKTaroFeignProxyInitializer";

export {
    Feign,
    RequestMapping,
    PostMapping,
    DeleteMapping,
    GetMapping,
    PutMapping,
    FetchRetry,
    Signature,
    OAKTaroFeignProxyInitializer
}