
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../';

const Test1 : any = AssertionTest()
  .describe('not 1')
  .setup(
    (next) => next(
      null,
      {
        template: SQLBars.compile('{{#if (not val)}}true{{/if}}'),
        data: {
          val: false,
        },
        expected: 'true',
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

const Test2 : any = AssertionTest()
  .describe('not 2')
  .setup(
    (next) => next(
      null,
      {
        template: SQLBars.compile('{{#if (not val)}}true{{/if}}'),
        data: {
          val: true,
        },
        expected: '',
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

const TESTS = [
  Test1,
  Test2,
];

describe(
  __filename,
  () => TESTS.forEach(
    (test, i) => it(test.label || `test ${i}`, test)
  )
)
