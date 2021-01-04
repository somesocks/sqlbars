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
var From_1 = __importDefault(require("sequences/From"));
var Join_1 = __importDefault(require("sequences/Join"));
var Map_1 = __importDefault(require("sequences/Map"));
var Sort_1 = __importDefault(require("sequences/Sort"));
var ToArray_1 = __importDefault(require("sequences/ToArray"));
var sql_1 = __importDefault(require("./sql"));
var sql_id_1 = __importDefault(require("./sql-id"));
function sqlInsert() {
    var sqlbars = this;
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
    var schema = FromObject_1.default(rows[0])
        .pipe(Map_1.default, function (_a) {
        var key = _a.key, value = _a.value;
        return key;
    })
        .pipe(Sort_1.default)
        .pipe(ToArray_1.default)
        .read();
    // console.log('sqlInsert schema', schema);
    var tableToken = sql_id_1.default.call(sqlbars, table, undefined);
    var schemaToken = FromArray_1.default(schema)
        .pipe(Map_1.default, function (id) { return sql_id_1.default.call(sqlbars, id, undefined).toString(); })
        .pipe(Concat_1.default, ', ')
        .read();
    var buildValueToken = function (value) { return Join_1.default(From_1.default(value), FromArray_1.default(schema))
        .pipe(Map_1.default, function (_a) {
        var value = _a[0], token = _a[1];
        return value[token];
    })
        .pipe(Map_1.default, function (value) { return sql_1.default.call(sqlbars, value, undefined).toString(); })
        .pipe(Concat_1.default, ', ')
        .pipe(Map_1.default, function (val) { return "(" + val + ")"; })
        .read(); };
    var valuesToken = FromArray_1.default(rows)
        .pipe(Map_1.default, buildValueToken)
        .pipe(Concat_1.default, ', ')
        .read();
    var res = "insert into " + tableToken.toString() + " (" + schemaToken + ") values " + valuesToken + ";";
    return new handlebars_1.default.SafeString(res);
}
exports.default = sqlInsert;
