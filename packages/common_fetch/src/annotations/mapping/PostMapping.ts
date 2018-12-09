import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {ReqequestMethod} from "../../constant/ReqequestMethod";

/**
 * PostMapping
 */
export const PostMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(ReqequestMethod.POST);