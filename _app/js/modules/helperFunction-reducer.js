/**
 * A named reduce function that can be re-used in different modules instead of repeating the same line on code several times.
 * @param {number} sum the accumulator
 * @param {number} currentValue current value in array 
 * @returns sum
 */
export const reducer = (sum, currentValue) => sum + currentValue;
