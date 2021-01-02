
import Handlebars from 'handlebars';

import sql from './sql';

function sqlList(this : any) {
	let res = sql.apply(this, arguments as any);
	res = res.toString();
	if (res[0] === '(' && res[res.length - 1] === ')') {
		res = res.substring(1, res.length - 1);
	}
	return new Handlebars.SafeString(res);
}

export default sqlList;
