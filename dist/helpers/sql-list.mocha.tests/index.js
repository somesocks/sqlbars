"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _UndefinedTest_1 = __importDefault(require("./_UndefinedTest"));
var _NullTest_1 = __importDefault(require("./_NullTest"));
var _BooleanTest1_1 = __importDefault(require("./_BooleanTest1"));
var _BooleanTest2_1 = __importDefault(require("./_BooleanTest2"));
var _ArrayTest1_1 = __importDefault(require("./_ArrayTest1"));
var _ArrayTest2_1 = __importDefault(require("./_ArrayTest2"));
var _StringTest1_1 = __importDefault(require("./_StringTest1"));
var _StringTest2_1 = __importDefault(require("./_StringTest2"));
var _StringTest3_1 = __importDefault(require("./_StringTest3"));
var _StringTest4_1 = __importDefault(require("./_StringTest4"));
var _StringTest5_1 = __importDefault(require("./_StringTest5"));
var TESTS = [
    _UndefinedTest_1.default,
    _NullTest_1.default,
    _BooleanTest1_1.default,
    _BooleanTest2_1.default,
    _StringTest1_1.default,
    _StringTest2_1.default,
    _StringTest3_1.default,
    _StringTest4_1.default,
    _StringTest5_1.default,
    _ArrayTest1_1.default,
    _ArrayTest2_1.default,
];
describe(__filename, function () { return TESTS.forEach(function (test, i) { return it(test.label || "test " + i, test); }); });
