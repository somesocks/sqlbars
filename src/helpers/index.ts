
import and from './and';
import or from './or';
import not from './not';


import sql from './sql';
import sqlID from './sql-id';
import sqlInsert from './sql-insert';
import sqlLimit from './sql-limit';
import sqlList from './sql-list';
import sqlOffset from './sql-offset';
import sqlOrder from './sql-order';

const helpers = {
	'and': and,
	'or': or,
	'not': not,

	'sql': sql,
	'sql-id': sqlID,
	'sql-insert': sqlInsert,
	'sql-limit': sqlLimit,
	'sql-list': sqlList,
	'sql-offset': sqlOffset,
	'sql-order': sqlOrder,
};

export default helpers;
