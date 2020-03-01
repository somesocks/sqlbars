"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_LIMIT = 999999999999;
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
function sqlLimit(limit) {
    switch (typeof limit) {
        case 'undefined': {
            return '';
        }
        case 'number':
        case 'string': {
            limit = parseInt(limit); // convert from string to number / truncate number to int
            if (isNaN(limit)) {
                throw new Error('{{sql-limit}} cannot build limit from NaN');
            }
            limit = limit < 0 ? MAX_LIMIT : limit;
            return 'LIMIT ' + limit;
        }
        default: {
            throw new Error('{{sql-limit}} cannot build limit from value of type ' + typeof limit);
        }
    }
}
exports.default = sqlLimit;
