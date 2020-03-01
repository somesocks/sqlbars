/**
 *
 * ```javascript
 *  import SQLBars from 'sqlbars';
 *
 *  const template = SQLBars.compile('{{sql-limit val}}')
 *
 *  const res1 = template({ }); // result is '';
 *  const res2 = template({ val: 0 }); // result is 'LIMIT 0';
 *  const res3 = template({ val: '0' }); // result is 'LIMIT 0';
 *
 * ```
 *
 * `{{sql-limit}}` safely builds a limit statement from a data prop or constant,
 *
 * @name `sql-limit`
 * @memberof sqlbars
*/
declare function sqlLimit(this: any, limit: any): string;
export default sqlLimit;
