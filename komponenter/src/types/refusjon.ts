import { Diskresjonskode } from './aktsomhet';
import { KorreksjonStatus, RefusjonStatus } from './status';
import { Tiltak } from './tiltak';

export interface PageableRefusjon {
    currentPage: number;
    refusjoner: Refusjon[];
    size: number;
    totalItems: number;
    totalPages: number;
}

export interface Refusjon {
    id: string;
    bedriftNr: string;
    deltakerFnr: string;
    godkjentAvArbeidsgiver?: string;
    status: RefusjonStatus;
    forrigeFristForGodkjenning?: string;
    fristForGodkjenning: string;
    harTattStillingTilAlleInntektslinjer: boolean;
    korreksjonId?: string;
    refusjonsgrunnlag: Refusjonsgrunnlag;
    utbetaltTidspunkt?: string;
    unntakOmInntekterFremitid: number;
    hentInntekterLengerFrem: string;
    sistEndret: string;
    åpnetFørsteGang: string;
    harInntektIAlleMåneder: boolean;
    senestMuligeGodkjenningsfrist: string;
    diskresjonskode: Diskresjonskode
}

export interface Korreksjon {
    id: string;
    korrigererRefusjonId: string;
    bedriftNr: string;
    deltakerFnr: string;
    status: KorreksjonStatus;
    harInntektIAlleMåneder: boolean;
    kostnadssted?: string;
    korreksjonsgrunner: Korreksjonsgrunn[];
    refusjonsgrunnlag: Refusjonsgrunnlag;
    harTattStillingTilAlleInntektslinjer: boolean;
    godkjentTidspunkt?: string;
    unntakOmInntekterFremitid: number;
    sistEndret: string;
}

export interface Refusjonsgrunnlag {
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
    inntekterKunFraTiltaket?: boolean;
    endretBruttoLønn?: number;
    bedriftKid?: string;
    bedriftKontonummer?: string;
    bedriftKontonummerInnhentetTidspunkt?: string;
    beregning?: Beregning;
    forrigeRefusjonMinusBeløp?: number;
    fratrekkRefunderbarBeløp?: boolean;
    harFerietrekkForSammeMåned: boolean;
    refunderbarBeløp?: number;
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
    erOpptjentIPeriode?: boolean;
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
    sumUtgifterFratrukketRefundertBeløp: number;
    lønnFratrukketFerie: number;
    tidligereRefundertBeløp: number;
    overFemGrunnbeløp: boolean;
}

export enum Korreksjonsgrunn {
    UTBETALT_HELE_TILSKUDDSBELØP = 'UTBETALT_HELE_TILSKUDDSBELØP',
    HENT_INNTEKTER_TO_MÅNEDER_FREM = 'HENT_INNTEKTER_TO_MÅNEDER_FREM',
    HENT_INNTEKTER_PÅ_NYTT = 'HENT_INNTEKTER_PÅ_NYTT',
    TRUKKET_FEIL_FOR_FRAVÆR = 'TRUKKET_FEIL_FOR_FRAVÆR',
    OPPDATERT_AMELDING = 'OPPDATERT_AMELDING',
    ANNEN_GRUNN = 'ANNEN_GRUNN',
    INNTEKTER_RAPPORTERT_ETTER_TILSKUDDSPERIODE = 'INNTEKTER_RAPPORTERT_ETTER_TILSKUDDSPERIODE',
    DELTAKER_HAR_IKKE_VÆRT_TILSTEDE_I_PERIODEN = 'DELTAKER_HAR_IKKE_VÆRT_TILSTEDE_I_PERIODEN',
}

export interface PageableRefusjon {
    currentPage: number;
    refusjoner: Refusjon[];
    size: number;
    totalItems: number;
    totalPages: number;
}

export enum HendelseType {
    RefusjonOpprettet = 'RefusjonOpprettet',
    BeregningUtført = 'BeregningUtført',
    GodkjentAvArbeidsgiver = 'GodkjentAvArbeidsgiver',
    RefusjonGodkjentNullBeløp = 'RefusjonGodkjentNullBeløp',
    RefusjonGodkjentMinusBeløp = 'RefusjonGodkjentMinusBeløp',
    FristForlenget = 'FristForlenget',
    KorreksjonBeregningUtført = 'KorreksjonBeregningUtført',
    KorreksjonMerketForOppgjort = 'KorreksjonMerketForOppgjort',
    KorreksjonMerketForTilbakekreving = 'KorreksjonMerketForTilbakekreving',
    KorreksjonSendtTilUtbetaling = 'KorreksjonSendtTilUtbetaling',
    MerketForInntekterFrem = 'MerketForInntekterFrem',
    RefusjonVarselKlar = 'RefusjonVarselKlar',
    RefusjonVarselRevarsel = 'RefusjonVarselRevarsel',
    RefusjonVarselFristForlenget = 'RefusjonVarselFristForlenget',
    RefusjonVarselKorrigert = 'RefusjonVarselKorrigert',
    RefusjonAnnullert = 'RefusjonAnnullert',
    RefusjonForkortet = 'RefusjonForkortet',
    TilskuddsperioderIRefusjonAnnullertManuelt = 'TilskuddsperioderIRefusjonAnnullertManuelt',
    SaksbehandlerMerketForInntekterLengerFrem = 'SaksbehandlerMerketForInntekterLengerFrem',
    KryssetAvForFravær = 'KryssetAvForFravær',
}

export interface Hendelse {
    id: string;
    // appImageId: string;
    refusonId: string;
    event: HendelseType;
    smsType?: string;
    utførtAv?: string;
    tidspunkt: string;
    metadata: HendelseMetadata;
}

export interface HendelseMetadata {
    antallMndFremITid: number;
}
