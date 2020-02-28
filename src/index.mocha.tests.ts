
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from './';

const ImportTest = AssertionTest()
  .describe('can import sqlbars')
  .build();

const CreateTest = AssertionTest()
  .describe('can create sqlbars instance')
  .prepare((next) => next())
  .execute(
    (next) => {
      const instance = SQLBars.create();
      next(null, instance);
    }
  )
  .verify(
    AssertionTest.VerifyErrorWasNotThrown
  )
  .build();

const TESTS = [
  ImportTest,
  CreateTest,
];

describe(
  __filename,
  () => TESTS.forEach(
    (test, i) => it(test.label || `test ${i}`, test)
  )
)
