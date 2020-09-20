
import TemplateTest1 from './TemplateTest1';
import TemplateTest2 from './TemplateTest2';
import TemplateTest3 from './TemplateTest3';
import TemplateTest4 from './TemplateTest4';
import PerformanceTest1 from './PerformanceTest1';

const TESTS = [
  TemplateTest1,
  TemplateTest2,
  TemplateTest3,
  TemplateTest4,
  PerformanceTest1,
];

describe(
  __filename,
  () => TESTS.forEach(
    (test, i) => it(test.label || `test ${i}`, test)
  )
)
