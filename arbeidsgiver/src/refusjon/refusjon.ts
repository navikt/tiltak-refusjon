import { Refusjon } from '~/types/refusjon';
import { KorreksjonStatus } from './status';
import { Tiltak } from './tiltak';

export interface PageableRefusjon {
    currentPage: number;
    refusjoner: Refusjon[];
    size: number;
    totalItems: number;
    totalPages: number;
}

export interface Korreksjon {
    id: string;
    korrigererRefusjonId: string;
    bedriftNr: string;
    deltakerFnr: string;
    status: KorreksjonStatus;
    kostnadssted?: string;
    korreksjonsgrunner: Korreksjonsgrunn[];
    refusjonsgrunnlag: Refusjonsgrunnlag;
    godkjentTidspunkt?: string;
    unntakOmInntekterFremitid: number;
    sistEndret: string;
}

export interface Refusjonsgrunnlag {
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
    inntekterKunFraTiltaket?: boolean;
    fratrekkRefunderbarBeløp?: boolean;
    endretBruttoLønn?: number;
    bedriftKontonummer?: string;
    bedriftKid?: string;
    refunderbarBeløp?: number;
    beregning?: Beregning;
    forrigeRefusjonMinusBeløp: number;
    sumUtbetaltVarig?: number;
}

export interface Tilskuddsgrunnlag {
    arbeidsgiveravgiftSats: number;
    avtaleId: string;
    avtaleNr: number;
    avtaleFom?: string;
    avtaleTom?: string;
    løpenummer: number;
    bedriftNavn: string;
    bedriftNr: string;
    deltakerEtternavn: string;
    deltakerFnr: string;
    deltakerFornavn: string;
    arbeidsgiverFornavn: string;
    arbeidsgiverEtternavn: string;
    arbeidsgiverTlf: string;
    feriepengerSats: number;
    id: string;
    lønnstilskuddsprosent: number;
    otpSats: number;
    tilskuddFom: string;
    tilskuddTom: string;
    tilskuddsbeløp: number;
    tilskuddsperiodeId: string;
    tiltakstype: Tiltak;
    veilederNavIdent: string;
    enhet: string;
}

export interface Inntektsgrunnlag {
    innhentetTidspunkt: string;
    inntekter: Inntektslinje[];
    bruttoLønn: number;
}

export interface Inntektslinje {
    inntektType: string;
    beskrivelse?: string;
    beløp: number;
    måned: string;
    id: string;
    opptjeningsperiodeFom?: string;
    opptjeningsperiodeTom?: string;
    erMedIInntektsgrunnlag: boolean;
    erOpptjentIPeriode: boolean | undefined | null;
}

export interface Beregning {
    arbeidsgiveravgift: number;
    feriepenger: number;
    id: string;
    lønn: number;
    refusjonsbeløp: number;
    beregnetBeløp: number;
    overTilskuddsbeløp: boolean;
    sumUtgifter: number;
    tjenestepensjon: number;
    tidligereUtbetalt: number;
    fratrekkLønnFerie: number;
    lønnFratrukketFerie: number;
    tidligereRefundertBeløp: number;
    sumUtgifterFratrukketRefundertBeløp: number;
    overFemGrunnbeløp: boolean;
}

export enum Korreksjonsgrunn {
    // REBEREGNING = 'REBEREGNING',
    UTBETALT_HELE_TILSKUDDSBELØP = 'UTBETALT_HELE_TILSKUDDSBELØP',
    INNTEKTER_RAPPORTERT_ETTER_TILSKUDDSPERIODE = 'INNTEKTER_RAPPORTERT_ETTER_TILSKUDDSPERIODE',
    HENT_INNTEKTER_PÅ_NYTT = 'HENT_INNTEKTER_PÅ_NYTT',
    HENT_INNTEKTER_TO_MÅNEDER_FREM = 'HENT_INNTEKTER_TO_MÅNEDER_FREM',
    TRUKKET_FEIL_FOR_FRAVÆR = 'TRUKKET_FEIL_FOR_FRAVÆR',
    OPPDATERT_AMELDING = 'OPPDATERT_AMELDING',
    ANNEN_GRUNN = 'ANNEN_GRUNN',
}
