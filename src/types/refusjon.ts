

export interface Refusjon {
    id: string;
    tiltakstype: TiltaksType;
    fraDato: Date;
    tilDato: Date;
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
    satsRefusjon: number;
    refusjonsBelop: number;
}

export type TiltaksType = 'Arbeidstrening' | 'Midlertidig lønnstilskudd' | 'Midlertidig lønnstilskudd';