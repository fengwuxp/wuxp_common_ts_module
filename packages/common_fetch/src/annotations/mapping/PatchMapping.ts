import {BaseRequestMappingOptions, generateMapping, Mapping} from "./Mapping";
import {RequestMethod} from "../../constant/RequestMethod";


/**
 * PatchMapping
 */
export const PatchMapping: Mapping<BaseRequestMappingOptions> = generateMapping<BaseRequestMappingOptions>(RequestMethod.PATCH);