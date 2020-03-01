
import Assert from 'callback-patterns/Assert';
import AssertionTest from 'callback-patterns/testing/AssertionTest';

import SQLBars from '../';

import path from 'path';
import fs from 'fs';

const TEMPLATE_FILE = path.join(__dirname, 'TemplateTest2.input.hbs');
const EXPECTED_FILE = path.join(__dirname, 'TemplateTest2.expected.hbs');

const Test : any = AssertionTest()
  .describe('template test 2')
  .setup(
    (next) => next(
      null,
      {
        template: SQLBars.compile(fs.readFileSync(TEMPLATE_FILE, 'utf8')),
        data: {
          names: ["alice", "bob", "c\"harlie"],
        },
        expected: fs.readFileSync(EXPECTED_FILE, 'utf8'),
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
