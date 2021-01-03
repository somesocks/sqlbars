
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import MYSQL from '../../mysql';
import POSTGRES from '../../postgresql';

const TestM : any = AssertionTest()
	.describe('can escape strings to id')
	.setup(
		(next) => next(
			null,
			{
				template: MYSQL.compile('{{sql-id val}}'),
				data: {
					val: 'foo',
				},
				expected: '`foo`',
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

const TestP : any = AssertionTest()
	.describe('can escape strings to id')
	.setup(
		(next) => next(
			null,
			{
				template: POSTGRES.compile('{{sql-id val}}'),
				data: {
					val: 'foo',
				},
				expected: '"foo"',
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

export default [ TestM, TestP ];
