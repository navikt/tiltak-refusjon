export interface Refusjon {
    id: string;
    tiltakstype: TiltaksType;
    deltakerNavn: String;
    veilederNavn: String;
    bedriftNavn: String;
    bedriftKontaktperson: String
    feriedager: number;
    trekkFeriedager: number;
    sykepenger: number;
    sykedager: number;
    stillingsprosent: number;
    manedslonn: number;
    nettoManedslonn: number;
    satsFeriepenger: number;
    feriepenger: number;
    satsOtp: number;
    otpBelop: number;
    satsArbgiverAvgift: number;
    arbgiverAvgift: number;
    totalArbgiverUtgift: number;
    refusjonsProsent: number;
    refusjonsBelop: number;
    varighet: Varighet;
}

export interface Varighet {
    fraDato: String;
    tilDato: String;
    maaneder: number;
    dager: number;
}

export type TiltaksType = 'Arbeidstrening' | 'Midlertidig lønnstilskudd' | 'Midlertidig lønnstilskudd';