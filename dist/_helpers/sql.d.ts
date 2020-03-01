import Handlebars from 'handlebars';
/**
 *
 * ```javascript
 *  import SQLBars from 'sqlbars';
 *
 *  const template = SQLBars.compile('{{sql val}}')
 *
 *  const res1 = template({ }); // result is 'NULL';
 *  const res2 = template({ val: true, }); // result is TRUE;
 *  const res3 = template({ val: 1.0, }); // result is 1.0;
 *  const res4 = template({ val: "foo", }); // result is 'foo';
 *  const res5 = template({ val: "fo'o", }); // result is 'fo\'o';
 *  const res6 = template({ val: [1, 2, 3] }); // result is (1, 2, 3);
 *
 * ```
 *
 * `{{sql}}` converts all values passed in to SQL-compatible types,
 * and escapes any special characters as
 *
 * @name sql
 * @memberof sqlbars
*/
declare function sql(this: any): string | Handlebars.SafeString;
export default sql;
