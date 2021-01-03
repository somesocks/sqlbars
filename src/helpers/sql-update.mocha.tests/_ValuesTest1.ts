
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../../';

const Test : any = AssertionTest()
	.describe('can escape array (as multiple values)')
	.setup(
		(next) => next(
			null,
			{
				template: SQLBars.compile('{{sql-update val}}'),
				data: {
					val: {
						table: 'Table',
						rows: [
							{ 
								set: { foo: 1, bar: 2 },
								where: { foo: 0 },
							},
							{ 
								set: { foo: 1, bar: 2 },
								where: { foo: true, bar: null },
							}
						],
					},
				},
				expected: 'UPDATE `Table` SET `foo` = 1, `bar` = 2 WHERE `foo` = 0;\nUPDATE `Table` SET `foo` = 1, `bar` = 2 WHERE `foo` = TRUE AND `bar` = NULL;',
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
