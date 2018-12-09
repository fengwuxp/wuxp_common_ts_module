import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {ReqequestMethod} from "../../constant/ReqequestMethod";


/**
 * PutMapping
 */
export const PutMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(ReqequestMethod.PUT);