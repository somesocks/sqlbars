
import Handlebars from 'handlebars';

const ESCAPE_REGEX = /`/g;

function _escape(val) {
	const type = typeof val;

	switch (type) {
		case 'string': { return new Handlebars.SafeString('`' + val.replace(ESCAPE_REGEX, '``') + '`'); }
		case 'object' : {
			if (Array.isArray(val)) {
				let sql = '';
				for (let i=0; i<val.length;i++) {
					sql += (i === 0 ? '' : '.') + _escape(val[i])
				}
				return new Handlebars.SafeString(sql);
			} else {
				throw new Error('cannot escape expression of type object');
			}
		}
		default: { throw new Error('cannot escape expression of type ' + type); }
	}
}

function sqlID(this : any, ...args : any[]) {
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
