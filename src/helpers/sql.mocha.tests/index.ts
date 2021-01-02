
import UndefinedTest from './_UndefinedTest';
import NullTest from './_NullTest';

import BooleanTest1 from './_BooleanTest1';
import BooleanTest2 from './_BooleanTest2';

import ArrayTest1 from './_ArrayTest1';
import ArrayTest2 from './_ArrayTest2';

import StringTest1 from './_StringTest1';
import StringTest2 from './_StringTest2';
import StringTest3 from './_StringTest3';
import StringTest4 from './_StringTest4';
import StringTest5 from './_StringTest5';

const TESTS = [
	UndefinedTest,
	NullTest,

	BooleanTest1,
	BooleanTest2,

	StringTest1,
	StringTest2,
	StringTest3,
	StringTest4,
	StringTest5,

	ArrayTest1,
	ArrayTest2,

];

describe(
	__filename,
	() => TESTS.forEach(
		(test, i) => it(test.label || `test ${i}`, test)
	)
)
