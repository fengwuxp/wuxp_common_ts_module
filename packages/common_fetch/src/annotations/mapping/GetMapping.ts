import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {RequestMethod} from "../../constant/RequestMethod";


/**
 * GetMapping
 */
export const GetMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(RequestMethod.GET);