import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {ReqequestMethod} from "../../constant/ReqequestMethod";


/**
 * DeleteMapping
 */
export const DeleteMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(ReqequestMethod.DELETE);