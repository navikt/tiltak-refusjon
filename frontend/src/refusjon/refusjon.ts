export interface Refusjon {
    id: string;
    tiltak: Tiltakstype;
    deltaker: string;
    deltakerFnr: string;
    veileder: string;
    bedrift: string;
    bedriftnummer: string;
    bedriftKontaktperson: string;
    feriedager: number;
    trekkFeriedagerBeløp: number;
    sykepenger: number;
    sykedager: number;
    stillingsprosent: number;
    månedslønn: number;
    nettoMånedslønn: number;
    satsFeriepenger: number;
    feriepenger: number;
    satsOtp: number;
    beløpOtp: number;
    satsArbeidsgiveravgift: number;
    arbeidsgiveravgift: number;
    sumUtgifterArbeidsgiver: number;
    satsRefusjon: number;
    refusjonPrMåned: number;
    fraDato: string;
    tilDato: string;
    opprettet_tidspunkt: string;
}

export type Tiltakstype =
    | "Arbeidstrening"
    | "Midlertidig lønnstilskudd"
    | " lønnstilskudd";
