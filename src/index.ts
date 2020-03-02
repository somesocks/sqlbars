import Handlebars from 'handlebars';

import helpers from './helpers';

const _create = () => {
  const instance = Handlebars.create();

  (instance as any).create = _create;

  instance.registerHelper(helpers);

  return instance;
};

const SQLBars = _create();

export default SQLBars;
