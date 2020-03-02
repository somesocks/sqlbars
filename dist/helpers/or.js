"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function or() {
    switch (arguments.length) {
        case 0:
        case 1: {
            throw new Error('{{or}} not enough arguments');
        }
        default: {
            var res = false;
            for (var i = 0; i < arguments.length - 1; i++) {
                res = res || arguments[i];
            }
            return res;
        }
    }
}
exports.default = or;
