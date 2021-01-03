"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ValuesTest1_1 = __importDefault(require("./_ValuesTest1"));
var TESTS = [
    _ValuesTest1_1.default,
];
describe(__filename, function () { return TESTS.forEach(function (test, i) { return it(test.label || "test " + i, test); }); });
