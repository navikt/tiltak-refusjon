/**
 * Sjekker om en verdi er null eller undefined
 */
export const erNil = (x: any): x is null | undefined => x === null || x === undefined;
