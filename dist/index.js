"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var _escapeExpression = function () { return null; };
var _create = function () {
    var instance = handlebars_1.default.create();
    instance.escapeExpression = _escapeExpression;
    instance.create = _create;
    return instance;
};
var SQLBars = _create();
exports.default = SQLBars;
