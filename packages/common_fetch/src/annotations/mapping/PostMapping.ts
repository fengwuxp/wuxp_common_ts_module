import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {RequestMethod} from "../../constant/RequestMethod";

/**
 * PostMapping
 */
export const PostMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(RequestMethod.POST);