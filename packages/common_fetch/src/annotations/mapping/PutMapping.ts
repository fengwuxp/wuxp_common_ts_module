import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {RequestMethod} from "../../constant/RequestMethod";


/**
 * PutMapping
 */
export const PutMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(RequestMethod.PUT);