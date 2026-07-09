import { Tilskuddsgrunnlag } from '~/types';
import { erNil } from './predicates';

export const storForbokstav = (tekst: string) => {
    return tekst ? tekst.toLowerCase().replace(/\b\w/, (v) => v.toUpperCase()) : tekst;
};

export const kunStorForbokstav = (tekst: string) => {
    return tekst ? tekst.replace(/\b\w/, (v) => v.toUpperCase()) : tekst;
};

export const lagRefusjonsnummer = (tilskuddsgrunnlag: Tilskuddsgrunnlag): string => {
    const { avtaleNr, løpenummer, resendingsnummer } = tilskuddsgrunnlag;
    if (!erNil(resendingsnummer)) {
        return `T-${avtaleNr}-${løpenummer}-R${resendingsnummer}`;
    } else {
        return `T-${avtaleNr}-${løpenummer}`;
    }
};
