import { Feilkode, Feilmeldinger } from '~/feilkodemapping';

export class ApiError extends Error {}
export class FeilkodeError extends Error {
    feilkode: Feilkode;
    feilmelding: string;

    constructor(feilkode: Feilkode) {
        super(feilkode);
        this.feilkode = feilkode;
        this.feilmelding = Feilmeldinger[feilkode as Feilkode] || 'Det har skjedd en feil: ' + feilkode;
    }
}
