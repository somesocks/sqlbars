

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

function sqlInsert(this : TSQLBars) {
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

	const schema = FromObject(rows[0])
		.pipe(Map, ({ key, value }) => key)
		.pipe(Sort)
		.pipe(ToArray)
		.read<any[]>();

	// console.log('sqlInsert schema', schema);

	const tableToken = sqlID.call(sqlbars, table, undefined); 

	const schemaToken = FromArray(schema)
		.pipe(Map, (id) => sqlID.call(sqlbars, id, undefined).toString())
		.pipe(Concat, ', ')
		.read();

	const buildValueToken = (value) => Join(From(value), FromArray(schema))
		.pipe(Map, ([ value, token ]) => value[token])
		.pipe(Map, (value) => sql.call(sqlbars, value, undefined).toString())
		.pipe(Concat, ', ')
		.pipe(Map, (val) => `(${val})`)
		.read<string>();

	const valuesToken = FromArray(rows)
		.pipe(Map, buildValueToken)
		.pipe(Concat, ', ')
		.read<string>();

	const res = `INSERT INTO ${tableToken.toString()} (${schemaToken}) VALUES ${valuesToken};`;

	return new Handlebars.SafeString(res);
}

export default sqlInsert;
