"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlbars_1 = __importDefault(require("./sqlbars"));
var ESCAPE_ID_REGEX = /"/g;
var CONFIG = {
    sql: {
        'flavor': 'postgresql',
        delimiter: '\'',
        delimiterID: '"',
        escapeID: function (val) { return val.replace(ESCAPE_ID_REGEX, '\\"'); }
    }
};
exports.default = sqlbars_1.default(CONFIG);
