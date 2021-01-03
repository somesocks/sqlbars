
import Handlebars from 'handlebars';

import { TSQLBars } from '../sqlbars';

const ESCAPE_REGEX = /`/g;

function _escape(this : TSQLBars, val) {
	const type = typeof val;
	const { delimiterID, escapeID } = this.sql;

	switch (type) {
		case 'string': { return new Handlebars.SafeString(delimiterID + escapeID(val) + delimiterID); }
		case 'object' : {
			if (Array.isArray(val)) {
				let sql = '';
				for (let i=0; i<val.length;i++) {
					sql += (i === 0 ? '' : '.') + _escape.call(this, val[i])
				}
				return new Handlebars.SafeString(sql);
			} else {
				throw new Error('cannot escape expression of type object');
			}
		}
		default: { throw new Error('cannot escape expression of type ' + type); }
	}
}

function sqlID(this : TSQLBars, ...args : any[]) {
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

export default sqlID;
