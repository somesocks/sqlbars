"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var From_1 = __importDefault(require("sequences/From"));
var Flatten_1 = __importDefault(require("sequences/Flatten"));
var ToArray_1 = __importDefault(require("sequences/ToArray"));
var _ArrayTest1_1 = __importDefault(require("./_ArrayTest1"));
var _ArrayTest2_1 = __importDefault(require("./_ArrayTest2"));
var _StringTest1_1 = __importDefault(require("./_StringTest1"));
var _StringTest2_1 = __importDefault(require("./_StringTest2"));
var _StringTest3_1 = __importDefault(require("./_StringTest3"));
var TESTS = From_1.default(_StringTest1_1.default, _StringTest2_1.default, _StringTest3_1.default, _ArrayTest1_1.default, _ArrayTest2_1.default)
    .pipe(Flatten_1.default)
    .pipe(ToArray_1.default)
    .read();
describe(__filename, function () { return TESTS.forEach(function (test, i) { return it(test.label || "test " + i, test); }); });
