"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function and() {
    switch (arguments.length) {
        case 0:
        case 1: {
            throw new Error('{{and}} not enough arguments');
        }
        default: {
            var res = true;
            for (var i = 0; i < arguments.length - 1; i++) {
                res = res && arguments[i];
            }
            return res;
        }
    }
}
exports.default = and;
