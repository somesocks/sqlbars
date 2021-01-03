

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

import sql from './sql';
import sqlID from './sql-id';

function sqlInsert(this : any) {
	// console.log('sqlInsert arguments', arguments.length, arguments);

	let table : string;
	let values : any[];

	switch (arguments.length) {
		case 2: {
			table = arguments[0].table;
			values = arguments[0].values;
			break;
		}
		case 3: {
			table = arguments[0];
			values = arguments[1];
			break;
		}
		default: {
			throw new Error('unexpected number of arguments');
		}
	}

	isString.assert(table);
	isArray.assert(values);

	const schema = FromObject(values[0])
		.pipe(Map, ({ key, value }) => key)
		.pipe(Sort)
		.pipe(ToArray)
		.read<any[]>();

	// console.log('sqlInsert schema', schema);

	const tableToken = sqlID(table, undefined); 

	const schemaToken = FromArray(schema)
		.pipe(Map, (id) => sqlID(id, undefined).toString())
		.pipe(Concat, ', ')
		.read();

	const buildValueToken = (value) => Join(From(value), FromArray(schema))
		.pipe(Map, ([ value, token ]) => value[token])
		.pipe(Map, (value) => sql(value, undefined).toString())
		.pipe(Concat, ', ')
		.pipe(Map, (val) => `(${val})`)
		.read<string>();

	const valuesToken = FromArray(values)
		.pipe(Map, buildValueToken)
		.pipe(Concat, ', ')
		.read<string>();

	const res = `INSERT INTO ${tableToken.toString()} (${schemaToken}) VALUES ${valuesToken};`;

	return new Handlebars.SafeString(res);
}

export default sqlInsert;
