
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../../';

const Test : any = AssertionTest()
	.describe('can escape array (as multiple values)')
	.setup(
		(next) => next(
			null,
			{
				template: SQLBars.compile('{{sql-insert val}}'),
				data: {
					val: {
						table: 'Table',
						values: [
							{ foo: 1, bar: 2 },
							{ foo: true, bar: null},
							{ foo: 'two', bar: new Date(0) },
						],
					},
				},
				expected: 'INSERT INTO `Table` (`bar`, `foo`) VALUES (2, 1), (NULL, TRUE), (\'1970-01-01 00:00:00.000\', \'two\');',
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
