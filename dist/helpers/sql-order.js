"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var sql_id_1 = __importDefault(require("./sql-id"));
function _escape(val) {
    var type = typeof val;
    switch (type) {
        case 'string': {
            if (val[0] === '-') {
                val = val.slice(1);
                val = sql_id_1.default.call(this, val, null) + ' DESC';
            }
            else if (val[0] === '+') {
                val = val.slice(1);
                val = sql_id_1.default.call(this, val, null) + ' ASC';
            }
            else {
                val = sql_id_1.default.call(this, val, null) + ' ASC';
            }
            return val;
        }
        case 'object': {
            if (Array.isArray(val)) {
                return val.map(_escape, this).join(', ');
            }
            else {
                throw new Error('{{sql-order}} cannot escape expression of type ' + type);
            }
        }
        default: {
            throw new Error('{{sql-order}} cannot escape expression of type ' + type);
        }
    }
}
function sqlOrder() {
    switch (arguments.length) {
        case 0:
        case 1: {
            throw new Error('unexpected number of arguments');
        }
        case 2: {
            var res = _escape.call(this, arguments[0]);
            return new handlebars_1.default.SafeString(res);
        }
        default: {
            var res = _escape.call(this, Array.prototype.slice.call(arguments, 0, arguments.length - 1));
            return new handlebars_1.default.SafeString(res);
        }
    }
}
exports.default = sqlOrder;
