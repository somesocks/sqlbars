
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../../';

const Test : any = AssertionTest()
	.describe('can escape recursive arrays')
	.setup(
		(next) => next(
			null,
			{
				template: SQLBars.compile('{{sql val1 val2 val3}}'),
				data: {
					val1: true,
					val2: true,
					val3: [ true, true ],
				},
				expected: '(true, true, (true, true))',
			}
		)
	)
	.prepare((next, setup) => next(null, setup))
	.execute(
		(next, { template, data }) => next(
			null,
			template(data)
		)
	)
	.verify(
		AssertionTest.VerifyErrorWasNotThrown,
		Assert(
			(test) => test.result === test.setup.expected,
			(test) => `expected ${test.setup.expected}, got ${test.result}`
		)
	)
	.build();


export default Test;
