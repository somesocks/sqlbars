
import SQLBars from './sqlbars';

const ESCAPE_ID_REGEX = /"/g;

const CONFIG = {
	sql: {
		'flavor': 'postgresql',
		delimiter: '\'',
		delimiterID: '"',
		escapeID: (val: string) => val.replace(ESCAPE_ID_REGEX, '\\"')
	}
};

export default SQLBars(CONFIG);