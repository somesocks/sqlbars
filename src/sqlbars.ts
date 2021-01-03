import Handlebars from 'handlebars';

import helpers from './helpers';
import importHelper from 'handlebars-helper-import';

export type TSQLBarsConfig = {
	sql: {
		flavor: string,
		delimiter: string,
		// escape: (val : string) => string,
		delimiterID: string,
		escapeID: (val : string) => string,
	}
}

const ESCAPE_ID_REGEX = /`/g;

const DEFAULT_CONFIG = {
	sql: {
		'flavor': 'mysql',
		delimiter: '\'',
		delimiterID: '`',
		escapeID: (val: string) => val.replace(ESCAPE_ID_REGEX, '``')
	}
};

export type TSQLBars = typeof Handlebars & {
	sql: TSQLBarsConfig['sql'],
};

const SQLBars = (config: TSQLBarsConfig = DEFAULT_CONFIG) : TSQLBars => {

	const instance : TSQLBars = Handlebars.create() as TSQLBars;

	(instance as any).create = SQLBars;
	(instance as any).sql = config.sql; 

	const _importHelper = importHelper(instance);
	instance.registerHelper('import', _importHelper);

	const _boundHelpers = { } as typeof helpers;

	for (let key in helpers) {
		if (helpers.hasOwnProperty(key)){
			_boundHelpers[key] = helpers[key].bind(instance);
		}
	}

	instance.registerHelper(_boundHelpers);

	return instance;
};

export default SQLBars;
