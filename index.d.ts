/**
 * Uses the default generator to generate a token of size characters.
 */
export function uid(size: number, chars?: string): string;

/**
 * Alias for uid(...) function.
 */
export const generate: typeof uid;

/**
 * Uses the default generator to generate mostly sequential ids
 * that can be compared with the usual string less-than/greater-than operators.
 */
export function suid(size: number, epoch?: number, prefixLength?: number): string;

interface GeneratorOptions {
    /**
     * Source of randomness.
     *
     * Acceptable values are a string or a synchronous function with the
     * signature `(size: number): Buffer`.
     * 
     * The following string values are also accepted:
     *
     * * `default` - This is a synonym for using the default of `crypto.pseudoRandomBytes`. You do not need to specify `default` and can simply create the generator without this option specified to get the same effect.
     * * `crypto` - This is a synonym for [`crypto.randomBytes`](http://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback). Note that this may throw an error during use if there is not enough entropy.
     * * `math` - This is a synonym for using the Math.random() function.
     */
    source?: 'default' | 'math' | 'crypto' | ((size: number) => Buffer);

    /**
     * Characters to use when generating tokens.
     *
     * The following string values have special meaning:
     *
     * * `default` - default set of token characters which is numbers, lower case letters, and upper case letters (i.e. `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`)
     * * `a-z` or `alpha` - lower case characters (i.e. `abcdefghijklmnopqrstuvwxyz`)
     * * `A-Z` or `ALPHA` - upper case characters (i.e. `ABCDEFGHIJKLMNOPQRSTUVWXYZ`)
     * * `0-9` or `numeric` - numbers only (i.e. `0123456789`)
     * * `base32` - use characters from the base32 alphabet, specifically `A-Z` and `2-7`
     *
     * Any other string value will be treated as an array of characters to use.
     *
     * Each character in the list has an equal chance of being used. For
     * example if a character is repeated twice, it will appear twice as often
     * in randomly generated tokens. `chars` may be at most 255 characters long.
     */
    chars?: string;
}

interface RandTokenGenerator {
    generate(size: number): string;
}

/**
 * Create a random token generator using the given options.
 */
export function generator(options?: GeneratorOptions): RandTokenGenerator;
