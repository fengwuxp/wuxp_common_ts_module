import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {ReqequestMethod} from "../../constant/ReqequestMethod";


/**
 * GetMapping
 */
export const GetMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(ReqequestMethod.GET);