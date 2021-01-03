
import From from 'sequences/From';
import Flatten from 'sequences/Flatten';
import ToArray from 'sequences/ToArray';

import ArrayTest1 from './_ArrayTest1';
import ArrayTest2 from './_ArrayTest2';

import StringTest1 from './_StringTest1';
import StringTest2 from './_StringTest2';
import StringTest3 from './_StringTest3';

const TESTS = From(
		StringTest1,
		StringTest2,
		StringTest3,
		
		ArrayTest1,
		ArrayTest2,
	)
	.pipe(Flatten)
	.pipe(ToArray)
	.read<any[]>();

describe(
	__filename,
	() => TESTS.forEach(
		(test, i) => it(test.label || `test ${i}`, test)
	)
)
