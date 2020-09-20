"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("callback-patterns/Assert"));
var AssertionTest_1 = __importDefault(require("callback-patterns/testing/AssertionTest"));
var __1 = __importDefault(require("../../"));
var Test = AssertionTest_1.default()
    .describe('can escape boolean (true)')
    .setup(function (next) { return next(null, {
    template: __1.default.compile('{{sql val}}'),
    data: {
        val: true,
    },
    expected: 'TRUE',
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown, Assert_1.default(function (test) { return test.result === test.setup.expected; }, function (test) { return "expected " + test.setup.expected + ", got " + test.result; }))
    .build();
exports.default = Test;
