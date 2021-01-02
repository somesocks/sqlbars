
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../';

import path from 'path';
import fs from 'fs';

const TEMPLATE_FILE = path.join(__dirname, 'PerformanceTest1.input.hbs');
const EXPECTED_FILE = path.join(__dirname, 'PerformanceTest1.expected.hbs');

const Test: any = AssertionTest()
	.describe('performance test 1')
	.setup(
		(next) => next(
			null,
			{
				template: SQLBars.compile(fs.readFileSync(TEMPLATE_FILE, 'utf8')),
				data: {
					// names: ["alice", "bob", "c\"harlie"],
					limit: 12,
				},
				expected: fs.readFileSync(EXPECTED_FILE, 'utf8'),
			}
		)
	)
	.prepare((next, setup) => next(null, setup))
	.execute(
		(next, { template, data }) => {
			let res;
			for(let i=0; i<10000; i++) {
				res = template(data);
			}
			next(null, res);
		}
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
