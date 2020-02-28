
import Handlebars from 'handlebars';

const _escapeExpression = () => null;

const _create = () => {
  const instance = Handlebars.create();

  (instance as any).escapeExpression = _escapeExpression;
  (instance as any).create = _create;

  return instance;
};

const SQLBars = _create();

export default SQLBars;
