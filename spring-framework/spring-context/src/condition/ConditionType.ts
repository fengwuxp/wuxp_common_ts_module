/**
 * condition
 */

export type ConditionFunction = (context, ...args) => boolean | string | string[];

export type ConditionType = string | string[] | boolean | ConditionFunction;