declare function toISO9075String(date: Date): string;
declare function isISO9075String(str: any): boolean;
declare function fromISO9075String(str: string, date?: Date): Date;
export { isISO9075String, toISO9075String, fromISO9075String, };
