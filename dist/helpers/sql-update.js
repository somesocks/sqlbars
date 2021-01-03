"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var isString_1 = __importDefault(require("vet/strings/isString"));
var isArray_1 = __importDefault(require("vet/arrays/isArray"));
var Concat_1 = __importDefault(require("sequences/Concat"));
var FromArray_1 = __importDefault(require("sequences/FromArray"));
var FromObject_1 = __importDefault(require("sequences/FromObject"));
var Map_1 = __importDefault(require("sequences/Map"));
var sql_1 = __importDefault(require("./sql"));
var sql_id_1 = __importDefault(require("./sql-id"));
function sqlUpdate() {
    // console.log('sqlInsert arguments', arguments.length, arguments);
    var table;
    var rows;
    switch (arguments.length) {
        case 2: {
            table = arguments[0].table;
            rows = arguments[0].rows;
            break;
        }
        case 3: {
            table = arguments[0];
            rows = arguments[1];
            break;
        }
        default: {
            throw new Error('unexpected number of arguments');
        }
    }
    isString_1.default.assert(table);
    isArray_1.default.assert(rows);
    var buildSetClause = function (set) { return FromObject_1.default(set)
        .pipe(Map_1.default, function (_a) {
        var key = _a.key, value = _a.value;
        return sql_id_1.default(key, undefined).toString() + " = " + sql_1.default(value, undefined).toString();
    })
        .pipe(Concat_1.default, ', ')
        .read(); };
    var buildWhereClause = function (where) { return FromObject_1.default(where)
        .pipe(Map_1.default, function (_a) {
        var key = _a.key, value = _a.value;
        return sql_id_1.default(key, undefined).toString() + " = " + sql_1.default(value, undefined).toString();
    })
        .pipe(Concat_1.default, ' AND ')
        .read(); };
    var buildUpdateStatement = function (table, row) { return "UPDATE " + sql_id_1.default(table, undefined).toString() + " SET " + buildSetClause(row.set) + " WHERE " + buildWhereClause(row.where) + ";"; };
    var res = FromArray_1.default(rows)
        .pipe(Map_1.default, function (row) { return buildUpdateStatement(table, row); })
        .pipe(Concat_1.default, '\n')
        .read();
    return new handlebars_1.default.SafeString(res);
}
exports.default = sqlUpdate;
