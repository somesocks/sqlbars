"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var sql_1 = __importDefault(require("./_helpers/sql"));
var sql_id_1 = __importDefault(require("./_helpers/sql-id"));
var sql_limit_1 = __importDefault(require("./_helpers/sql-limit"));
var sql_offset_1 = __importDefault(require("./_helpers/sql-offset"));
var _create = function () {
    var instance = handlebars_1.default.create();
    instance.create = _create;
    instance.registerHelper('sql', sql_1.default);
    instance.registerHelper('sql-id', sql_id_1.default);
    instance.registerHelper('sql-limit', sql_limit_1.default);
    instance.registerHelper('sql-offset', sql_offset_1.default);
    return instance;
};
var SQLBars = _create();
exports.default = SQLBars;
