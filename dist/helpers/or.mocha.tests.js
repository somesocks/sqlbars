"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("callback-patterns/Assert"));
var AssertionTest_1 = __importDefault(require("callback-patterns/testing/AssertionTest"));
var __1 = __importDefault(require("../"));
var Test1 = AssertionTest_1.default()
    .describe('or 1')
    .setup(function (next) { return next(null, {
    template: __1.default.compile('{{#if (or val1 val2)}}true{{/if}}'),
    data: {
        val1: true,
        val2: true,
    },
    expected: 'true',
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown, Assert_1.default(function (test) { return test.result === test.setup.expected; }, function (test) { return "expected " + test.setup.expected + ", got " + test.result; }))
    .build();
var Test2 = AssertionTest_1.default()
    .describe('or 2')
    .setup(function (next) { return next(null, {
    template: __1.default.compile('{{#if (or val1 val2)}}true{{/if}}'),
    data: {
        val1: true,
        val2: false,
    },
    expected: 'true',
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown, Assert_1.default(function (test) { return test.result === test.setup.expected; }, function (test) { return "expected " + test.setup.expected + ", got " + test.result; }))
    .build();
var Test3 = AssertionTest_1.default()
    .describe('or 3')
    .setup(function (next) { return next(null, {
    template: __1.default.compile('{{#if (or val1 val2)}}true{{/if}}'),
    data: {
        val1: false,
        val2: true,
    },
    expected: 'true',
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown, Assert_1.default(function (test) { return test.result === test.setup.expected; }, function (test) { return "expected " + test.setup.expected + ", got " + test.result; }))
    .build();
var Test4 = AssertionTest_1.default()
    .describe('or 4')
    .setup(function (next) { return next(null, {
    template: __1.default.compile('{{#if (or val1 val2)}}true{{/if}}'),
    data: {
        val1: false,
        val2: false,
    },
    expected: '',
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown, Assert_1.default(function (test) { return test.result === test.setup.expected; }, function (test) { return "expected " + test.setup.expected + ", got " + test.result; }))
    .build();
var TESTS = [
    Test1,
    Test2,
    Test3,
    Test4,
];
describe(__filename, function () { return TESTS.forEach(function (test, i) { return it(test.label || "test " + i, test); }); });
