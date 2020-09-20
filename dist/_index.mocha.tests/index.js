"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TemplateTest1_1 = __importDefault(require("./TemplateTest1"));
var TemplateTest2_1 = __importDefault(require("./TemplateTest2"));
var TemplateTest3_1 = __importDefault(require("./TemplateTest3"));
var TemplateTest4_1 = __importDefault(require("./TemplateTest4"));
var PerformanceTest1_1 = __importDefault(require("./PerformanceTest1"));
var TESTS = [
    TemplateTest1_1.default,
    TemplateTest2_1.default,
    TemplateTest3_1.default,
    TemplateTest4_1.default,
    PerformanceTest1_1.default,
];
describe(__filename, function () { return TESTS.forEach(function (test, i) { return it(test.label || "test " + i, test); }); });
