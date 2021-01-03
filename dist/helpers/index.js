"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var and_1 = __importDefault(require("./and"));
var or_1 = __importDefault(require("./or"));
var not_1 = __importDefault(require("./not"));
var sql_1 = __importDefault(require("./sql"));
var sql_id_1 = __importDefault(require("./sql-id"));
var sql_insert_1 = __importDefault(require("./sql-insert"));
var sql_limit_1 = __importDefault(require("./sql-limit"));
var sql_list_1 = __importDefault(require("./sql-list"));
var sql_offset_1 = __importDefault(require("./sql-offset"));
var sql_order_1 = __importDefault(require("./sql-order"));
var helpers = {
    'and': and_1.default,
    'or': or_1.default,
    'not': not_1.default,
    'sql': sql_1.default,
    'sql-id': sql_id_1.default,
    'sql-insert': sql_insert_1.default,
    'sql-limit': sql_limit_1.default,
    'sql-list': sql_list_1.default,
    'sql-offset': sql_offset_1.default,
    'sql-order': sql_order_1.default,
};
exports.default = helpers;
