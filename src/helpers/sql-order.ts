
import Handlebars from 'handlebars';

import sqlID from './sql-id';

function _escape(val) {
  const type = typeof val;

  switch (type) {
    case 'string': {
      if (val[0] === '-') {
        val = val.slice(1);
        val = sqlID(val, null) + ' DESC';
      } else if (val[0] === '+') {
        val = val.slice(1);
        val = sqlID(val, null) + ' ASC';
      } else {
        val = sqlID(val, null) + ' ASC';
      }
      return val;
    }
    case 'object': {
      if (Array.isArray(val)) {
        return val.map(_escape).join(', ');        
      } else {
        throw new Error('{{sql-order}} cannot escape expression of type ' + type);
      }
    }
    default: { throw new Error('{{sql-order}} cannot escape expression of type ' + type); }
  }
}

function sqlOrder(this : any) {
	switch (arguments.length) {
		case 0:
		case 1: {
			throw new Error('unexpected number of arguments');
		}
		case 2: {
      let res = _escape(arguments[0]);
      return new Handlebars.SafeString(res);
		}
		default: {
			let res = _escape(Array.prototype.slice.call(arguments, 0, arguments.length - 1))
      return new Handlebars.SafeString(res);
		}
	}
}

export default sqlOrder;
