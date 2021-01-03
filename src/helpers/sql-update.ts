

import Handlebars from 'handlebars';

import isString from 'vet/strings/isString';
import isArray from 'vet/arrays/isArray';

import Concat from 'sequences/Concat';
import FromArray from 'sequences/FromArray';
import FromObject from 'sequences/FromObject';
import From from 'sequences/From';
import Join from 'sequences/Join';
import Map from 'sequences/Map';
import Sort from 'sequences/Sort';
import ToArray from 'sequences/ToArray';

import { TSQLBars } from '../sqlbars';

import sql from './sql';
import sqlID from './sql-id';

function sqlUpdate(this : TSQLBars) {
	const sqlbars = this;
	// console.log('sqlInsert arguments', arguments.length, arguments);

	let table : string;
	let rows : any[];

	switch (arguments.length) {
		case 2: {
			table = arguments[0].table;
			rows = arguments[0].rows;
			break;
		}
		case 3: {
			table = arguments[0];
			rows = arguments[1];
			break;
		}
		default: {
			throw new Error('unexpected number of arguments');
		}
	}

	isString.assert(table);
	isArray.assert(rows);

	const buildSetClause = (set) => FromObject(set)
		.pipe(Map,({ key, value }) => `${sqlID.call(sqlbars, key, undefined).toString()} = ${sql.call(sqlbars, value, undefined).toString()}`)
		.pipe(Concat, ', ')
		.read<string>();

	const buildWhereClause = (where) => FromObject(where)
		.pipe(Map,({ key, value }) => `${sqlID.call(sqlbars, key, undefined).toString()} = ${sql.call(sqlbars, value, undefined).toString()}`)
		.pipe(Concat, ' AND ')
		.read<string>();

	const buildUpdateStatement = (table, row) => `UPDATE ${sqlID.call(sqlbars, table, undefined).toString()} SET ${buildSetClause(row.set)} WHERE ${buildWhereClause(row.where)};`	

	const res = FromArray(rows)
		.pipe(Map, (row) => buildUpdateStatement(table, row))
		.pipe(Concat, '\n')
		.read<string>();

	return new Handlebars.SafeString(res);
}

export default sqlUpdate;
