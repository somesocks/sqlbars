"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _NumberTest1_1 = __importDefault(require("./_NumberTest1"));
var _NumberTest2_1 = __importDefault(require("./_NumberTest2"));
var _NumberTest3_1 = __importDefault(require("./_NumberTest3"));
var _NumberTest4_1 = __importDefault(require("./_NumberTest4"));
var _StringTest1_1 = __importDefault(require("./_StringTest1"));
var _StringTest2_1 = __importDefault(require("./_StringTest2"));
var TESTS = [
    _NumberTest1_1.default,
    _NumberTest2_1.default,
    _NumberTest3_1.default,
    _NumberTest4_1.default,
    _StringTest1_1.default,
    _StringTest2_1.default,
];
describe(__filename, function () { return TESTS.forEach(function (test, i) { return it(test.label || "test " + i, test); }); });
