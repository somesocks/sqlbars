"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var dates_1 = require("../utils/dates");
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
            else if (val instanceof Date) {
                return new handlebars_1.default.SafeString('\'' + dates_1.toISO9075String(val) + '\'');
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
