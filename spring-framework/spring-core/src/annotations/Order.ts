/**
 * Useful constant for the highest precedence value.
 */
const HIGHEST_PRECEDENCE: number = 0x80000000;

/**
 * Useful constant for the lowest precedence value.
 */
const LOWEST_PRECEDENCE: number = 0x7fffffff;


/**
 * {@code @Order} defines the sort order for an annotated component.
 * @param value
 * @constructor
 */
export const Order = (value: number = LOWEST_PRECEDENCE): Function => {

    return null;
};
