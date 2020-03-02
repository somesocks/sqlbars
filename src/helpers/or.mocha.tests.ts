
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../';

const Test1 : any = AssertionTest()
  .describe('or 1')
  .setup(
    (next) => next(
      null,
      {
        template: SQLBars.compile('{{#if (or val1 val2)}}true{{/if}}'),
        data: {
          val1: true,
          val2: true,
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
  .describe('or 2')
  .setup(
    (next) => next(
      null,
      {
        template: SQLBars.compile('{{#if (or val1 val2)}}true{{/if}}'),
        data: {
          val1: true,
          val2: false,
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

const Test3 : any = AssertionTest()
  .describe('or 3')
  .setup(
    (next) => next(
      null,
      {
        template: SQLBars.compile('{{#if (or val1 val2)}}true{{/if}}'),
        data: {
          val1: false,
          val2: true,
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

const Test4 : any = AssertionTest()
  .describe('or 4')
  .setup(
    (next) => next(
      null,
      {
        template: SQLBars.compile('{{#if (or val1 val2)}}true{{/if}}'),
        data: {
          val1: false,
          val2: false,
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
  Test3,
  Test4,
];

describe(
  __filename,
  () => TESTS.forEach(
    (test, i) => it(test.label || `test ${i}`, test)
  )
)
