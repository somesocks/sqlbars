
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../../';

const Test : any = AssertionTest()
	.describe('number test 3')
	.setup(
		(next) => next(
			null,
			{
				template: SQLBars.compile('{{sql-offset val}}'),
				data: {
					val: -1,
				},
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
