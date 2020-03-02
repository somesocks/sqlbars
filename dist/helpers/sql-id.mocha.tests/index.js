"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ArrayTest1_1 = __importDefault(require("./_ArrayTest1"));
var _ArrayTest2_1 = __importDefault(require("./_ArrayTest2"));
var _StringTest1_1 = __importDefault(require("./_StringTest1"));
var _StringTest2_1 = __importDefault(require("./_StringTest2"));
var _StringTest3_1 = __importDefault(require("./_StringTest3"));
var TESTS = [
    _StringTest1_1.default,
    _StringTest2_1.default,
    _StringTest3_1.default,
    _ArrayTest1_1.default,
    _ArrayTest2_1.default,
];
describe(__filename, function () { return TESTS.forEach(function (test, i) { return it(test.label || "test " + i, test); }); });
