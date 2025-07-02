import { erNil } from './predicates';

export const storForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase().replace(/\b\w/, (v) => v.toUpperCase()) : tekst;
};

export const kunStorForbokstav = (tekst: string) => {
    return tekst ? tekst.replace(/\b\w/, (v) => v.toUpperCase()) : tekst;
};

export const lagId = (avtaleNr: number, løpenummer: number, resendingsnummer: number | undefined | null): string => {
    if (!erNil(resendingsnummer)) {
        return `T-${avtaleNr}-${løpenummer}-R${resendingsnummer}`;
    } else {
        return `T-${avtaleNr}-${løpenummer}`;
    }
};
