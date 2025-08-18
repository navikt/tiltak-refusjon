import { FeilkodeError } from '~/types/errors';

export const handterFeil = (
    error: Error,
    visFeilmelding: (feilmelding: string) => void,
    fallbackMelding: string = 'Det har skjedd en uventet feil'
) => {
    if (error instanceof FeilkodeError) {
        visFeilmelding(error.feilmelding);
    } else {
        visFeilmelding(error.message || fallbackMelding);
    }
};
