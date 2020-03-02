
import NumberTest1 from './_NumberTest1';
import NumberTest2 from './_NumberTest2';
import NumberTest3 from './_NumberTest3';
import NumberTest4 from './_NumberTest4';

import StringTest1 from './_StringTest1';
import StringTest2 from './_StringTest2';

const TESTS = [
  NumberTest1,
  NumberTest2,
  NumberTest3,
  NumberTest4,

  StringTest1,
  StringTest2,
];

describe(
  __filename,
  () => TESTS.forEach(
    (test, i) => it(test.label || `test ${i}`, test)
  )
)
