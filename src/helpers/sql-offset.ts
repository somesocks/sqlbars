
import Handlebars from 'handlebars';

import { TSQLBars } from '../sqlbars';

function sqlOffset(this : TSQLBars, offset : any) {
	switch (typeof offset) {
		case 'undefined' : {
			return 0;
		}
		case 'number':
		case 'string': {
			offset = parseInt(offset as any); // convert from string to number / truncate number to int
			if (isNaN(offset)) { throw new Error('{{sql-offset}} cannot build offset from NaN'); }
			if (offset < 0) { throw new Error('{{sql-offset}} offset cannot be negative'); }
			return offset;
		}
		default: {
			throw new Error('{{sql-offset}} cannot build offset from value of type ' + typeof offset);
		}
	}
}

export default sqlOffset;
