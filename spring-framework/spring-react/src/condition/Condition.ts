type ConditionFn = (context, ...args) => boolean | string | string[];

export type Condition = string | string[] | boolean | ConditionFn