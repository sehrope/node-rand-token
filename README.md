# node-rand-token

Generate random tokens from your choice of randomness.

# Installation

Add it to your node.js project via:

    npm install node-rand-token --save

# Usage

    // Create a token generator with the default settings:
    var randtoken = require('rand-token');

    // Generate a 16 character alpha-numeric token:
    var token = randtoken.generate(16);

# Functions

## generate(size, [chars])

Generates a token of `size` characters using either the specified `chars` or the default for the generator. 

If `chars` is specified it will be treated as an array of characters to use. Each character in the list has an equal chance of being used so if a character is repeated twice, it will appear twice as often in the randomly generated tokens.

__Note__: Unlike the `generator(...)` function this function does not treat any string values of `chars` to be special and all values will be simply treated as an array of possible characters.

## generator([options])

Creates a custom token generator.

Available options:

* `source` - source of random bytes
    This should be either a string or a function with a signature that matches `crypto.randomBytes(size, [callback])` (returning a buffer).

    The following string values are also accepted:

    * `default` - This is a synonym for using the default of `crypto.pseudoRandomBytes`. You do not need to specify `default` and can simply create the generator without this option specified to get the same effect.

    * `crypto` - This is a synonym for [`crypto.randomBytes`](http://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback). Note that this may throw an error during use if there is not enough entropy.

    * `math` - This is a synonym for using the Math.random() function.

* `chars` - string representing the list of allowed characters to use for `generate(size)` calls.

    The following string values have special meaning:

    * `default` - default set of token characters which is numbers, lower case letters, and upper case letters (i.e. `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`)
    * `a-z` || `alpha` - lower case characters (i.e. `abcdefghijklmnopqrstuvwxyz`)
    * `A-Z` || `ALPHA` - upper case characters (i.e. `ABCDEFGHIJKLMNOPQRSTUVWXYZ`)
    * `0-9` || `numeric` - numbers only (i.e. `0123456789`)
    * `base32` - use characters from the base32 alphabet, specifically `A-Z` and `2-7`

    Any other string value will be treated as an array of characters to use. 

    Each character in the list has an equal chance of being used. For example if a character is repeated twice, it will appear twice as often in randomly generated tokens. `chars` may be at most 255 characters long.

# Examples

To generate alpha-numeric (lower case a-z, upper case A-Z, and digits 0-9):

    // Create a token generator with the default settings:
    var randtoken = require('rand-token');

    // Generate a 16 character alpha-numeric token:
    var token = randtoken.generate(16);

To generate only lower case letters (a-z):

    // Create a token generator with the default settings:    
    var randtoken = require('rand-token').generator({
      chars: 'a-z'
    });

    // Generate a 16 character token:
    var token = randtoken.generate(16);

Alternatively, you can create a generator with the default options and pass the characters to use as the second parameter to `generate`:

    // Create a token generator with the default settings:    
    var randtoken = require('rand-token').generator();

    // Generate a 16 character token:
    var token = randtoken.generate(16, "abcdefghijklnmopqrstuvwxyz");

To generate only upper case letters with `crypto.randomBytes` as the random source:

    var crypto = require('crypto');
    // Create the generator:
    var randtoken = require('rand-token').generator({
      chars: 'A-Z',
      source: crypto.randomBytes 
    });

    // Generate a 16 character token:
    var token = randtoken.generate(16);


# Dependencies

* [lodash](lodash.com)

# License

This plugin is released under the MIT license. See the file [LICENSE](LICENSE).