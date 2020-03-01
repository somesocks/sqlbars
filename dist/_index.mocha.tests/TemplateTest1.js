"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Assert_1 = __importDefault(require("callback-patterns/Assert"));
var AssertionTest_1 = __importDefault(require("callback-patterns/testing/AssertionTest"));
var __1 = __importDefault(require("../"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var TEMPLATE_FILE = path_1.default.join(__dirname, 'TemplateTest1.input.hbs');
var EXPECTED_FILE = path_1.default.join(__dirname, 'TemplateTest1.expected.hbs');
var Test = AssertionTest_1.default()
    .describe('template test 1')
    .setup(function (next) { return next(null, {
    template: __1.default.compile(fs_1.default.readFileSync(TEMPLATE_FILE, 'utf8')),
    data: {
        val: undefined,
    },
    expected: fs_1.default.readFileSync(EXPECTED_FILE, 'utf8'),
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasNotThrown, Assert_1.default(function (test) { return test.result === test.setup.expected; }, function (test) { return "expected " + test.setup.expected + ", got " + test.result; }))
    .build();
exports.default = Test;
