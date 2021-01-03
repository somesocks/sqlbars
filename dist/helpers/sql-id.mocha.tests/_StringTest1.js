"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("callback-patterns/Assert"));
var AssertionTest_1 = __importDefault(require("callback-patterns/testing/AssertionTest"));
var mysql_1 = __importDefault(require("../../mysql"));
var postgresql_1 = __importDefault(require("../../postgresql"));
var TestM = AssertionTest_1.default()
    .describe('can escape strings to id')
    .setup(function (next) { return next(null, {
    template: mysql_1.default.compile('{{sql-id val}}'),
    data: {
        val: 'foo',
    },
    expected: '`foo`',
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown, Assert_1.default(function (test) { return test.result === test.setup.expected; }, function (test) { return "expected " + test.setup.expected + ", got " + test.result; }))
    .build();
var TestP = AssertionTest_1.default()
    .describe('can escape strings to id')
    .setup(function (next) { return next(null, {
    template: postgresql_1.default.compile('{{sql-id val}}'),
    data: {
        val: 'foo',
    },
    expected: '"foo"',
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown, Assert_1.default(function (test) { return test.result === test.setup.expected; }, function (test) { return "expected " + test.setup.expected + ", got " + test.result; }))
    .build();
exports.default = [TestM, TestP];
