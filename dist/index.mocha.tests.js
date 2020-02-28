"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AssertionTest_1 = __importDefault(require("callback-patterns/testing/AssertionTest"));
var _1 = __importDefault(require("./"));
var ImportTest = AssertionTest_1.default()
    .describe('can import sqlbars')
    .build();
var CreateTest = AssertionTest_1.default()
    .describe('can create sqlbars instance')
    .prepare(function (next) { return next(); })
    .execute(function (next) {
    var instance = _1.default.create();
    next(null, instance);
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown)
    .build();
var TESTS = [
    ImportTest,
    CreateTest,
];
describe(__filename, function () { return TESTS.forEach(function (test, i) { return it(test.label || "test " + i, test); }); });
