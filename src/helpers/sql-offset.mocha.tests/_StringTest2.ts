
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../../';

const Test : any = AssertionTest()
	.describe('string test 2')
	.setup(
		(next) => next(
			null,
			{
				template: SQLBars.compile('{{sql-offset val}}'),
				data: {
					val: '-1',
				},
				// expected: 'limit 999999999999',
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
		AssertionTest.VerifyErrorWasThrown,
	)
	.build();


export default Test;
