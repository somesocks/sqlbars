"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var AssertionTest_1 = __importDefault(require("callback-patterns/testing/AssertionTest"));
var __1 = __importDefault(require("../../"));
var Test = AssertionTest_1.default()
    .describe('number test 3')
    .setup(function (next) { return next(null, {
    template: __1.default.compile('{{sql-offset val}}'),
    data: {
        val: -1,
    },
}); })
    .prepare(function (next, setup) { return next(null, setup); })
    .execute(function (next, _a) {
    var template = _a.template, data = _a.data;
    return next(null, template(data));
})
    .verify(AssertionTest_1.default.VerifyErrorWasThrown)
    .build();
exports.default = Test;
