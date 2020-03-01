/** @namespace sqlbars */

import Handlebars from 'handlebars';

import sql from './_helpers/sql';
import sqlID from './_helpers/sql-id';
import sqlLimit from './_helpers/sql-limit';
import sqlOffset from './_helpers/sql-offset';

const _create = () => {
  const instance = Handlebars.create();

  (instance as any).create = _create;

  instance.registerHelper('sql', sql);
  instance.registerHelper('sql-id', sqlID);
  instance.registerHelper('sql-limit', sqlLimit);
  instance.registerHelper('sql-offset', sqlOffset);

  return instance;
};

const SQLBars = _create();

export default SQLBars;
