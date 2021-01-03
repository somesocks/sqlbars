
import Handlebars from 'handlebars';

import { TSQLBars } from '../sqlbars';

import { toISO9075String } from '../utils/dates';

const ESCAPE_REGEX = /[\0\b\t\n\r\x1a\"\'\\]/g;
const ESCAPE_MAP = {
	'\0' : '\\0',
	'\b' : '\\b',
	'\t' : '\\t',
	'\n' : '\\n',
	'\r' : '\\r',
	'\x1a' : '\\Z',
	'"' : '\\"',
	'\'' : '\\\'',
	'\\' : '\\\\'
};


function escapeChar(char) { return ESCAPE_MAP[char]; }

function _escape(this : TSQLBars, val) {
	const type = typeof val;

	switch (type) {
		case 'undefined': { return 'NULL'; }
		case 'boolean': { return (val) ? 'TRUE' : 'FALSE'; }
		case 'number': { return ''+val; }
		case 'string': { return new Handlebars.SafeString('\'' + val.replace(ESCAPE_REGEX, escapeChar) + '\''); }
		case 'object' : {
			if (val == null) {
				return 'NULL';
			} else if (Array.isArray(val)) {
				let sql = '(';
				for (let i=0; i<val.length;i++) {
					sql += (i === 0 ? '' : ', ') + _escape.call(this, val[i])
				}
				sql += ')';
				return new Handlebars.SafeString(sql);
			} else if (val instanceof Date) {
				return new Handlebars.SafeString('\'' + toISO9075String(val) + '\'');
			} else {
				throw new Error('cannot escape expression of type object');
			}
		}
		default: { throw new Error('cannot escape expression of type ' + type); }
	}
}

function sql(this : TSQLBars, ...args: any[]) {
	switch (arguments.length) {
		case 0:
		case 1: {
			throw new Error('unexpected number of arguments');
		}
		case 2: {
			return _escape.call(this, arguments[0]);
		}
		default: {
			const arr = Array.prototype.slice.call(arguments, 0, arguments.length - 1);
			return _escape.call(this, arr);
		}
	}
}

export default sql;
