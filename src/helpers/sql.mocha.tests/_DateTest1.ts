
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../../';

const Test : any = AssertionTest()
	.describe('can escape date')
	.setup(
		(next) => next(
			null,
			{
				template: SQLBars.compile('{{sql val}}'),
				data: {
					val: new Date(0),
				},
				expected: '\'1970-01-01 00:00:00.000\'',
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
