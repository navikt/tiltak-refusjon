import { erNil } from './predicates';
import { Tilskuddsgrunnlag } from '~/types/refusjon';

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

export const refusjonsnummer = ({
    avtaleNr,
    løpenummer,
    resendingsnummer,
}: Pick<Tilskuddsgrunnlag, 'avtaleNr' | 'løpenummer' | 'resendingsnummer'>): string =>
    resendingsnummer ? `${avtaleNr}-${løpenummer}-R${resendingsnummer}` : `${avtaleNr}-${løpenummer}`;
