
import Handlebars from 'handlebars';

import { TSQLBars } from '../sqlbars';

import sqlID from './sql-id';

function _escape(this : TSQLBars, val) {
	const type = typeof val;

	switch (type) {
		case 'string': {
			if (val[0] === '-') {
				val = val.slice(1);
				val = sqlID.call(this, val, null) + ' DESC';
			} else if (val[0] === '+') {
				val = val.slice(1);
				val = sqlID.call(this, val, null) + ' ASC';
			} else {
				val = sqlID.call(this, val, null) + ' ASC';
			}
			return val;
		}
		case 'object': {
			if (Array.isArray(val)) {
				return val.map(_escape, this).join(', ');				
			} else {
				throw new Error('{{sql-order}} cannot escape expression of type ' + type);
			}
		}
		default: { throw new Error('{{sql-order}} cannot escape expression of type ' + type); }
	}
}

function sqlOrder(this : TSQLBars) {
	switch (arguments.length) {
		case 0:
		case 1: {
			throw new Error('unexpected number of arguments');
		}
		case 2: {
			let res = _escape.call(this, arguments[0]);
			return new Handlebars.SafeString(res);
		}
		default: {
			let res = _escape.call(this, Array.prototype.slice.call(arguments, 0, arguments.length - 1))
			return new Handlebars.SafeString(res);
		}
	}
}

export default sqlOrder;
