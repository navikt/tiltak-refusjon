import { ApiError, FeilkodeError } from '~/types';

export const handterFeil = (
    error: Error,
    visFeilmelding: (feilmelding: string) => void,
    fallbackMelding: string = 'Det har skjedd en uventet feil'
) => {
    if (error instanceof FeilkodeError) {
        visFeilmelding(error.feilmelding);
    } else if (error instanceof ApiError) {
        visFeilmelding(error.message || fallbackMelding);
    } else {
        throw error;
    }
};
