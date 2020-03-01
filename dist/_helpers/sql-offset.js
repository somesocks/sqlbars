"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function sqlOffset(offset) {
    switch (typeof offset) {
        case 'undefined': {
            return '';
        }
        case 'number':
        case 'string': {
            offset = parseInt(offset); // convert from string to number / truncate number to int
            if (isNaN(offset)) {
                throw new Error('{{sql-offset}} cannot build offset from NaN');
            }
            if (offset < 0) {
                throw new Error('{{sql-offset}} offset cannot be negative');
            }
            return 'OFFSET ' + offset;
        }
        default: {
            throw new Error('{{sql-offset}} cannot build offset from value of type ' + typeof offset);
        }
    }
}
exports.default = sqlOffset;
