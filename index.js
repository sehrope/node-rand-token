(function () {
  "use strict";

  var crypto = require('crypto'),
      assert = require('assert'),
      _ = require('lodash');

  var numeric = '0123456789';
  var alphaLower = 'abcdefghijklmnopqrstuvwxyz';
  var alphaUpper = alphaLower.toUpperCase();
  var alphaNumeric = numeric + alphaLower + alphaUpper;
  
  var defaults = {
    "chars": 'default',
    "source": 'default'
  };

  function validateTokenChars(tokenChars) {
    assert(tokenChars);
    assert(_.isString(tokenChars));
    assert(tokenChars.length > 0);
    assert(tokenChars.length < 256);
  }

  function buildGenerator(options) {
    assert(!options || _.isObject(options));
    options = _.defaults(options || {}, defaults);

    // Allowed characters
    switch( options.chars ) {
      case 'default':
        options.chars = alphaNumeric;
        break;
      case 'a-z':
      case 'alpha':
        options.chars = alphaLower;
        break;
      case 'A-Z':
      case 'ALPHA':
        options.chars = alphaUpper;
        break;
      case '0-9':
      case 'numeric':
        options.chars = numeric;
        break;
      case 'base32':
        options.chars = alphaUpper + "234567";
        break;
      default:
        // use the characters as is
    }
    validateTokenChars(options.chars);

    // Source of randomness:
    switch( options.source ) {
      case 'default':
        options.source = function(size, cb) {
          return crypto.pseudoRandomBytes(size, !cb ? null : function (buf){
            return cb(null, buf);
          });
        };
        break;
      case 'crypto':
        options.source = crypto.randomBytes;
        break;
      case 'math':
        options.source = function(size, cb) {
          var buf = new Buffer(size);
          for(var i=0;i<size;i++) {
            buf.writeUInt8(Math.floor(256 * Math.random()), i);
          }
          if( cb ) {
            cb(null, buf);
          } else {
            return buf;
          }
        };
        break;
      default:
        assert(_.isFunction(options.source));
    }

    return {
      "generate": function(size, chars) {
        if( chars ) {
          validateTokenChars(chars);
        } else {
          chars = options.chars;
        }
        var max = Math.floor(256 / chars.length) * chars.length;
        var ret = "";
        while( ret.length < size ) {
          var buf = options.source(size - ret.length);
          for(var i=0;i<buf.length;i++) {
            var x = buf.readUInt8(i);
            if( x < max ) {
              ret += chars[x % chars.length];
            }
          }
        }
        return ret;
      }
    };
  }

  var defaultGenerator = buildGenerator();

  module.exports = {
    "generator": buildGenerator,
    "generate": defaultGenerator.generate
  };
})();
