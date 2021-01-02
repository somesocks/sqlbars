"use strict";
// ISO 9075 date strings (SQL standard) are similar to UTC,
// with a few minor differences that can cause issues.
// The general format is '9999-12-31 23:59:59.999999'
Object.defineProperty(exports, "__esModule", { value: true });
function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}
function toISO9075String(date) {
    return date.getUTCFullYear() +
        '-' + pad(date.getUTCMonth() + 1) +
        '-' + pad(date.getUTCDate()) +
        ' ' + pad(date.getUTCHours()) +
        ':' + pad(date.getUTCMinutes()) +
        ':' + pad(date.getUTCSeconds()) +
        '.' + (date.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5);
}
exports.toISO9075String = toISO9075String;
;
function isISO9075String(str) {
    return /^(\d{4,4})-(\d{2,2})-(\d{2,2}) (\d{2,2}):(\d{2,2}):(\d{2,2})(\.(\d{1,6}))?$/
        .test(str);
}
exports.isISO9075String = isISO9075String;
;
function fromISO9075String(str, date) {
    var self = date || new Date();
    // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
    var matches = str.match(/^(\d{4,4})-(\d{2,2})-(\d{2,2}) (\d{2,2}):(\d{2,2}):(\d{2,2})(\.(\d{1,6}))?$/) || [];
    var year = Number(matches[1]);
    var month = Number(matches[2]) - 1;
    var day = Number(matches[3]);
    var hour = Number(matches[4]);
    var min = Number(matches[5]);
    var sec = Number(matches[6]);
    var ms = matches[8] != null ? Number(matches[8]) : 0;
    self.setTime(0);
    self.setUTCFullYear(year);
    self.setUTCMonth(month);
    self.setUTCDate(day);
    self.setUTCHours(hour);
    self.setUTCMinutes(min);
    self.setUTCSeconds(sec, ms);
    return self;
}
exports.fromISO9075String = fromISO9075String;
;
