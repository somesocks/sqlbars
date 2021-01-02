
import ArrayTest1 from './_ArrayTest1';
import ArrayTest2 from './_ArrayTest2';
import ArrayTest3 from './_ArrayTest3';

import StringTest1 from './_StringTest1';
import StringTest2 from './_StringTest2';
import StringTest3 from './_StringTest3';

const TESTS = [
	StringTest1,
	StringTest2,
	StringTest3,

	ArrayTest1,
	ArrayTest2,
	ArrayTest3,
];

describe(
	__filename,
	() => TESTS.forEach(
		(test, i) => it(test.label || `test ${i}`, test)
	)
)
