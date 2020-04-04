/**
 * Returns the sum of numbers
 *
 * @remarks
 * This uses reduce to add numbers
 *
 * @example
 * ```ts
 * add(1,2) // -> 3
 * ```
 *
 * @param args - numbers to add
 * @returns the sum of `...args`
 */
export function add(...args) {
    return args.reduce((result, current) => result += current, 0);
}
