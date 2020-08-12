"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var helpers_1 = __importDefault(require("./helpers"));
var handlebars_helper_import_1 = __importDefault(require("handlebars-helper-import"));
var _create = function () {
    var instance = handlebars_1.default.create();
    instance.create = _create;
    var _importHelper = handlebars_helper_import_1.default(instance);
    instance.registerHelper('import', _importHelper);
    instance.registerHelper(helpers_1.default);
    return instance;
};
var SQLBars = _create();
exports.default = SQLBars;
