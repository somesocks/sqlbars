
import ValuesTest1 from './_ValuesTest1';

const TESTS = [
	ValuesTest1,
];

describe(
	__filename,
	() => TESTS.forEach(
		(test, i) => it(test.label || `test ${i}`, test)
	)
)
