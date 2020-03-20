import * as randToken from './index';
import { expectAssignable } from 'tsd';

expectAssignable<string>(randToken.uid(10));
expectAssignable<string>(randToken.uid(10, 'abcd1234'));

expectAssignable<string>(randToken.generate(10));
expectAssignable<string>(randToken.generate(10, 'abcd1234'));

expectAssignable<string>(randToken.suid(10));
expectAssignable<string>(randToken.suid(10, 1421452800000));
expectAssignable<string>(randToken.suid(10, 1421452800000, 5));

expectAssignable<string>(randToken.generator().generate(123));
expectAssignable<string>(randToken.generator({
    chars: 'abc1234',
}).generate(123));
expectAssignable<string>(randToken.generator({
    source: 'default',
}).generate(123));
expectAssignable<string>(randToken.generator({
    source: 'crypto',
}).generate(123));
expectAssignable<string>(randToken.generator({
    source: 'math',
}).generate(123));
expectAssignable<string>(randToken.generator({
    source: (size) => Buffer.alloc(size, 42),
}).generate(123));
