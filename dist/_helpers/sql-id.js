"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var ESCAPE_REGEX = /`/g;
function _escape(val) {
    var type = typeof val;
    switch (type) {
        case 'string': {
            return new handlebars_1.default.SafeString('`' + val.replace(ESCAPE_REGEX, '``') + '`');
        }
        case 'object': {
            if (Array.isArray(val)) {
                var sql = '';
                for (var i = 0; i < val.length; i++) {
                    sql += (i === 0 ? '' : '.') + _escape(val[i]);
                }
                return new handlebars_1.default.SafeString(sql);
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
 * `{{sql-id}}` safely builds a table or column name from props or constants,
 *
 * @name `sql-id`
 * @memberof sqlbars
*/
function sqlID() {
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
exports.default = sqlID;
