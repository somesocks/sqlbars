"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var sql_1 = __importDefault(require("./sql"));
function sqlList() {
    var res = sql_1.default.apply(this, arguments);
    res = res.toString();
    if (res[0] === '(' && res[res.length - 1] === ')') {
        res = res.substring(1, res.length - 1);
    }
    return new handlebars_1.default.SafeString(res);
}
exports.default = sqlList;
