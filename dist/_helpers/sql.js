"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var ESCAPE_REGEX = /[\0\b\t\n\r\x1a\"\'\\]/g;
var ESCAPE_MAP = {
    '\0': '\\0',
    '\b': '\\b',
    '\t': '\\t',
    '\n': '\\n',
    '\r': '\\r',
    '\x1a': '\\Z',
    '"': '\\"',
    '\'': '\\\'',
    '\\': '\\\\'
};
function escapeChar(char) { return ESCAPE_MAP[char]; }
function _escape(val) {
    var type = typeof val;
    switch (type) {
        case 'undefined': {
            return 'NULL';
        }
        case 'boolean': {
            return (val) ? 'TRUE' : 'FALSE';
        }
        case 'number': {
            return '' + val;
        }
        case 'string': {
            return new handlebars_1.default.SafeString('\'' + val.replace(ESCAPE_REGEX, escapeChar) + '\'');
        }
        case 'object': {
            if (val == null) {
                return 'NULL';
            }
            else if (Array.isArray(val)) {
                var sql_1 = '(';
                for (var i = 0; i < val.length; i++) {
                    sql_1 += (i === 0 ? '' : ', ') + _escape(val[i]);
                }
                sql_1 += ')';
                return new handlebars_1.default.SafeString(sql_1);
            }
            else {
                throw new Error('cannot escape expression of type object');
            }
        }
        default: {
            throw new Error('cannot escape expression of type ' + type);
        }
    }
}
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
function sql() {
    switch (arguments.length) {
        case 0:
        case 1: {
            throw new Error('unexpected number of arguments');
        }
        case 2: {
            return _escape.call(this, arguments[0]);
        }
        default: {
            var arr = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
            return _escape.call(this, arr);
        }
    }
}
exports.default = sql;
