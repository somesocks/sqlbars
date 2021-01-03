import Handlebars from 'handlebars';
export declare type TSQLBarsConfig = {
    sql: {
        flavor: string;
        delimiter: string;
        delimiterID: string;
        escapeID: (val: string) => string;
    };
};
export declare type TSQLBars = typeof Handlebars & {
    sql: TSQLBarsConfig['sql'];
};
declare const SQLBars: (config?: TSQLBarsConfig) => TSQLBars;
export default SQLBars;
