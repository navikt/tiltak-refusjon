export interface Refusjon {
    id: string;
    tiltak: tiltakstype;
    deltaker: String;
    veileder: String;
    bedrift: String;
    bedriftKontaktperson: String
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
}

export interface Varighet {
    fraDato: string;
    tilDato: string;
    måneder: number;
    dager: number;
}

export type tiltakstype = 'Arbeidstrening' | 'Midlertidig lønnstilskudd' | ' lønnstilskudd';