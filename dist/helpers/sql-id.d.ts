import Handlebars from 'handlebars';
import { TSQLBars } from '../sqlbars';
declare function sqlID(this: TSQLBars, ...args: any[]): Handlebars.SafeString;
export default sqlID;
