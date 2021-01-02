import Handlebars from 'handlebars';

import helpers from './helpers';
import importHelper from 'handlebars-helper-import';

const _create = () => {
	const instance = Handlebars.create();

	(instance as any).create = _create;

	const _importHelper = importHelper(instance);
	instance.registerHelper('import', _importHelper);

	instance.registerHelper(helpers);

	return instance;
};

const SQLBars = _create();

export default SQLBars;
