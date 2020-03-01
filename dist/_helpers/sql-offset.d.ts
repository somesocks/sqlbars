/**
 *
 * ```javascript
 *  import SQLBars from 'sqlbars';
 *
 *  const template = SQLBars.compile('{{sql-offset val}}')
 *
 *  const res1 = template({ }); // result is '';
 *  const res2 = template({ val: 0 }); // result is 'OFFSET 0';
 *  const res3 = template({ val: '0' }); // result is 'OFFSET 0';
 *
 * ```
 *
 * `{{sql-offset}}` safely builds an offset statement from a data prop or constant,
 *
 * @name `sql-offset`
 * @memberof sqlbars
*/
declare function sqlOffset(this: any, offset: any): string;
export default sqlOffset;
