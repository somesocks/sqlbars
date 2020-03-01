
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../../';

const Test : any = AssertionTest()
  .describe('can escape strings to id')
  .setup(
    (next) => next(
      null,
      {
        template: SQLBars.compile('{{sql-id val}}'),
        data: {
          val: 'foo.bar',
        },
        expected: '`foo.bar`',
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
