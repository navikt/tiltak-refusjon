import KvitteringSide from '@/refusjon/KvitteringSide/KvitteringSide';

import { Meta, StoryObj } from '@storybook/react';
import { Diskresjonskode } from '~/types';
import { Refusjon } from '~/types/refusjon';
import { RefusjonStatus } from '~/types/status';
import { Tiltak } from '~/types/tiltak';

const meta = {
    title: 'KvitteringSide',
    component: KvitteringSide,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof KvitteringSide>;

export default meta;
type Story = StoryObj<typeof meta>;

const førOver5GRefusjon: Refusjon = {
    refusjonsgrunnlag: {
        tilskuddsgrunnlag: {
            avtaleId: 'd9f6b823-6e8b-4f66-aca5-52c1dbdb0282',
            avtaleFom: undefined,
            avtaleTom: undefined,
            tilskuddsperiodeId: 'a85317ca-c0b2-496a-95a0-05944595ef76',
            deltakerFornavn: 'Olav',
            deltakerEtternavn: 'Over5gsen',
            deltakerFnr: '08098138758',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2024-01-01',
            tilskuddTom: '2024-01-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.VARIG_LØNNSTILSKUDD,
            tilskuddsbeløp: 70000,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HNJE38VPKCFXEHJCQWC29EFE',
        },
        inntektsgrunnlag: {
            inntekter: [
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 200000.0,
                    måned: '2024-01',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2024-01-31',
                    erOpptjentIPeriode: true,
                    id: '01HNJE4MRRA7EFCYCQYJ1514SN',
                    erMedIInntektsgrunnlag: true,
                },
            ],
            bruttoLønn: 200000.0,
            innhentetTidspunkt: '2024-02-01T14:36:10.520514',
        },
        bedriftKontonummer: '10000008145',
        bedriftKid: undefined,
        inntekterKunFraTiltaket: true,
        endretBruttoLønn: undefined,
        fratrekkRefunderbarBeløp: false,
        refunderbarBeløp: undefined,
        forrigeRefusjonMinusBeløp: 0,
        sumUtbetaltVarig: 0,
        harFerietrekkForSammeMåned: false,
        beregning: {
            lønn: 200000,
            lønnFratrukketFerie: 200000,
            feriepenger: 24000,
            tjenestepensjon: 4480,
            arbeidsgiveravgift: 32216,
            sumUtgifter: 260696,
            beregnetBeløp: 104278,
            refusjonsbeløp: 70000,
            overTilskuddsbeløp: true,
            tidligereUtbetalt: 0,
            fratrekkLønnFerie: 0,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: 260696,
            overFemGrunnbeløp: false,
            id: '01HNJE4V1TR0SCVNVGF7N3GND8',
        },
    },
    bedriftNr: '999999999',
    deltakerFnr: '08098138758',
    id: '01HNJE38VP9H59D98ZQ97C594G',
    fristForGodkjenning: '2024-03-31',
    forrigeFristForGodkjenning: undefined,
    unntakOmInntekterFremitid: 0,
    hentInntekterLengerFrem: '',
    godkjentAvArbeidsgiver: '2024-02-01T13:36:24.250479Z',
    status: RefusjonStatus.SENDT_KRAV,
    korreksjonId: undefined,
    utbetaltTidspunkt: undefined,
    åpnetFørsteGang: '2024-02-01T13:36:10.518149Z',
    sistEndret: '2024-02-01T13:36:16.955213Z',
    harTattStillingTilAlleInntektslinjer: true,
    harInntektIAlleMåneder: false,
    senestMuligeGodkjenningsfrist: '2024-04-29',
    diskresjonskode: Diskresjonskode.UGRADERT,
};

export const RefusjonFør5G: Story = {
    name: 'Refusjon før 5g overskrides',
    args: { refusjon: førOver5GRefusjon },
};

const over5gRefusjon: Refusjon = {
    refusjonsgrunnlag: {
        tilskuddsgrunnlag: {
            avtaleId: '4d34c301-22c1-4671-8295-d3c4099c67df',
            avtaleFom: undefined,
            avtaleTom: undefined,
            tilskuddsperiodeId: '16e119f2-cc28-4f8c-b6b9-8b5754cf83d7',
            deltakerFornavn: 'Olav',
            deltakerEtternavn: 'Over5gsen',
            deltakerFnr: '08098138758',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2024-01-01',
            tilskuddTom: '2024-01-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.VARIG_LØNNSTILSKUDD,
            tilskuddsbeløp: 55000,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HNJE38VPHVWS9Z8HDS9A2M7J',
        },
        inntektsgrunnlag: {
            inntekter: [
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 200000.0,
                    måned: '2024-01',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2024-01-31',
                    erOpptjentIPeriode: true,
                    id: '01HNJE55B5XTFHJ853311FJ76F',
                    erMedIInntektsgrunnlag: true,
                },
            ],
            bruttoLønn: 200000.0,
            innhentetTidspunkt: '2024-02-01T14:36:27.493631',
        },
        bedriftKontonummer: '10000008145',
        bedriftKid: undefined,
        inntekterKunFraTiltaket: true,
        endretBruttoLønn: undefined,
        fratrekkRefunderbarBeløp: false,
        refunderbarBeløp: undefined,
        forrigeRefusjonMinusBeløp: 0,
        sumUtbetaltVarig: 560000,
        harFerietrekkForSammeMåned: false,
        beregning: {
            lønn: 200000,
            lønnFratrukketFerie: 200000,
            feriepenger: 24000,
            tjenestepensjon: 4480,
            arbeidsgiveravgift: 32216,
            sumUtgifter: 260696,
            beregnetBeløp: 104278,
            refusjonsbeløp: 33100,
            overTilskuddsbeløp: true,
            tidligereUtbetalt: 0,
            fratrekkLønnFerie: 0,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: 260696,
            overFemGrunnbeløp: true,
            id: '01HNJE5CAV2S581VG9MBAM0VMW',
        },
    },
    bedriftNr: '999999999',
    deltakerFnr: '08098138758',
    id: '01HNJE38VPHE4ENNSTM567513D',
    fristForGodkjenning: '2024-03-31',
    forrigeFristForGodkjenning: undefined,
    unntakOmInntekterFremitid: 0,
    hentInntekterLengerFrem: '',
    godkjentAvArbeidsgiver: '2024-02-01T13:36:52.070165Z',
    status: RefusjonStatus.SENDT_KRAV,
    korreksjonId: undefined,
    utbetaltTidspunkt: undefined,
    åpnetFørsteGang: '2024-02-01T13:36:27.492860Z',
    sistEndret: '2024-02-01T13:36:34.652733Z',
    harTattStillingTilAlleInntektslinjer: true,
    harInntektIAlleMåneder: false,
    senestMuligeGodkjenningsfrist: '2024-04-29',
    diskresjonskode: Diskresjonskode.UGRADERT,
};

export const RefusjonOverskrider5G: Story = {
    name: 'Refusjon overskrider 5g',
    args: { refusjon: over5gRefusjon },
};

const etter5GRefusjon: Refusjon = {
    refusjonsgrunnlag: {
        tilskuddsgrunnlag: {
            avtaleId: '8931b3f3-c5e9-4041-9356-985f4415ec6a',
            avtaleFom: undefined,
            avtaleTom: undefined,
            tilskuddsperiodeId: '255109d2-3e64-4c48-98d6-696d8c616500',
            deltakerFornavn: 'Olav',
            deltakerEtternavn: 'Over5gsen',
            deltakerFnr: '08098138758',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2024-01-01',
            tilskuddTom: '2024-01-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.VARIG_LØNNSTILSKUDD,
            tilskuddsbeløp: 55000,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HNJE38VPDQ7CQP54S5A3TA5J',
        },
        inntektsgrunnlag: {
            inntekter: [
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 200000.0,
                    måned: '2024-01',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2024-01-31',
                    erOpptjentIPeriode: true,
                    id: '01HNJEBB0XVAT3WREMD3M5FB35',
                    erMedIInntektsgrunnlag: true,
                },
            ],
            bruttoLønn: 200000.0,
            innhentetTidspunkt: '2024-02-01T14:39:49.917987',
        },
        bedriftKontonummer: '10000008145',
        bedriftKid: undefined,
        inntekterKunFraTiltaket: true,
        endretBruttoLønn: undefined,
        fratrekkRefunderbarBeløp: false,
        refunderbarBeløp: undefined,
        forrigeRefusjonMinusBeløp: 0,
        sumUtbetaltVarig: 593100,
        harFerietrekkForSammeMåned: false,
        beregning: {
            lønn: 200000,
            lønnFratrukketFerie: 200000,
            feriepenger: 24000,
            tjenestepensjon: 4480,
            arbeidsgiveravgift: 32216,
            sumUtgifter: 260696,
            beregnetBeløp: 104278,
            refusjonsbeløp: 0,
            overTilskuddsbeløp: true,
            tidligereUtbetalt: 0,
            fratrekkLønnFerie: 0,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: 260696,
            overFemGrunnbeløp: true,
            id: '01HNJEBH2JD7CP0MFY7SY6W6JM',
        },
    },
    bedriftNr: '999999999',
    deltakerFnr: '08098138758',
    id: '01HNJE38VPRVEDKK6SAS4QC7YH',
    fristForGodkjenning: '2024-03-31',
    forrigeFristForGodkjenning: undefined,
    unntakOmInntekterFremitid: 0,
    hentInntekterLengerFrem: '',
    godkjentAvArbeidsgiver: '2024-02-01T13:40:00.997647Z',
    status: RefusjonStatus.GODKJENT_NULLBELØP,
    korreksjonId: undefined,
    utbetaltTidspunkt: undefined,
    åpnetFørsteGang: '2024-02-01T13:39:49.917544Z',
    sistEndret: '2024-02-01T13:39:56.115464Z',
    harTattStillingTilAlleInntektslinjer: true,
    harInntektIAlleMåneder: false,
    senestMuligeGodkjenningsfrist: '2024-04-29',
    diskresjonskode: Diskresjonskode.UGRADERT,
};

export const RefusjonEtter5G: Story = {
    name: 'Refusjon etter 5g har inntruffet',
    args: { refusjon: etter5GRefusjon },
};
