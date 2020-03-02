"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MAX_LIMIT = 999999999999;
function sqlLimit(limit) {
    switch (typeof limit) {
        case 'undefined': {
            return MAX_LIMIT;
        }
        case 'number':
        case 'string': {
            limit = parseInt(limit); // convert from string to number / truncate number to int
            if (isNaN(limit)) {
                throw new Error('{{sql-limit}} cannot build limit from NaN');
            }
            limit = limit < 0 ? MAX_LIMIT : limit;
            return limit;
        }
        default: {
            throw new Error('{{sql-limit}} cannot build limit from value of type ' + typeof limit);
        }
    }
}
sqlLimit.MAX_LIMIT = MAX_LIMIT;
exports.default = sqlLimit;
