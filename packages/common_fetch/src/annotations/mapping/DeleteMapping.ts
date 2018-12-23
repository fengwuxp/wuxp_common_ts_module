import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {RequestMethod} from "../../constant/RequestMethod";


/**
 * DeleteMapping
 */
export const DeleteMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(RequestMethod.DELETE);