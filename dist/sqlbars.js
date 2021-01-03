"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = __importDefault(require("handlebars"));
var helpers_1 = __importDefault(require("./helpers"));
var handlebars_helper_import_1 = __importDefault(require("handlebars-helper-import"));
var ESCAPE_ID_REGEX = /`/g;
var DEFAULT_CONFIG = {
    sql: {
        'flavor': 'mysql',
        delimiter: '\'',
        delimiterID: '`',
        escapeID: function (val) { return val.replace(ESCAPE_ID_REGEX, '``'); }
    }
};
var SQLBars = function (config) {
    if (config === void 0) { config = DEFAULT_CONFIG; }
    var instance = handlebars_1.default.create();
    instance.create = SQLBars;
    instance.sql = config.sql;
    var _importHelper = handlebars_helper_import_1.default(instance);
    instance.registerHelper('import', _importHelper);
    var _boundHelpers = {};
    for (var key in helpers_1.default) {
        if (helpers_1.default.hasOwnProperty(key)) {
            _boundHelpers[key] = helpers_1.default[key].bind(instance);
        }
    }
    instance.registerHelper(_boundHelpers);
    return instance;
};
exports.default = SQLBars;
