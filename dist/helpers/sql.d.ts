import Handlebars from 'handlebars';
import { TSQLBars } from '../sqlbars';
declare function sql(this: TSQLBars, ...args: any[]): string | Handlebars.SafeString;
export default sql;
