import KvitteringSide from '@/refusjon/KvitteringSide/KvitteringSide';

import type { Meta, StoryObj } from '@storybook/react';
import { Refusjon } from '~/types/refusjon';
import { RefusjonStatus } from '~/types/status';
import { Tiltak } from '~/types/tiltak';

const meta = {
    title: 'Refusjons Saksbehandler/KvitteringSide',
    component: KvitteringSide,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof KvitteringSide>;

export default meta;
type Story = StoryObj<typeof meta>;

const refusjonMedNullbelop: Refusjon = {
    refusjonsgrunnlag: {
        tilskuddsgrunnlag: {
            avtaleId: '1c299899-a306-4585-8ca8-b8a6ad504f0f',
            tilskuddsperiodeId: '56d6b753-5a4d-4d64-98b4-8d0d0be0b9a3',
            deltakerFornavn: 'Bjørnstjerne',
            deltakerEtternavn: 'Bjørnson',
            deltakerFnr: '28128521498',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'X123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-12-01',
            tilskuddTom: '2023-12-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 20579,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HMGST2JDDEAKMFE585F0WYCT',
        },
        inntektsgrunnlag: {
            inntekter: [
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'loennUtbetaltAvVeldedigEllerAllmennyttigInstitusjonEllerOrganisasjon',
                    beløp: 423.0,
                    måned: '2024-01',
                    opptjeningsperiodeFom: '2024-01-01',
                    opptjeningsperiodeTom: '2024-01-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4814SM8FYDAZG34FC',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'loennUtbetaltAvVeldedigEllerAllmennyttigInstitusjonEllerOrganisasjon',
                    beløp: 423.0,
                    måned: '2024-02',
                    opptjeningsperiodeFom: '2024-02-01',
                    opptjeningsperiodeTom: '2024-02-29',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4E829RD9Z0VCMTVMG',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'loennUtbetaltAvVeldedigEllerAllmennyttigInstitusjonEllerOrganisasjon',
                    beløp: 423.0,
                    måned: '2024-04',
                    opptjeningsperiodeFom: '2024-04-01',
                    opptjeningsperiodeTom: '2024-04-30',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4A1PWZPRHQ4DWHZZD',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 10000.0,
                    måned: '2024-04',
                    opptjeningsperiodeFom: '2024-04-01',
                    opptjeningsperiodeTom: '2024-04-30',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4FVXDTEWTDH3VAR09',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'trekkILoennForFerie',
                    beløp: -1200.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-01',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: undefined,
                    id: '01HMGWC4C4SPT74KD2CPVNNV7W',
                    erMedIInntektsgrunnlag: false,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'uregelmessigeTilleggKnyttetTilArbeidetTid',
                    beløp: 10000.0,
                    måned: '2024-01',
                    opptjeningsperiodeFom: '2024-01-01',
                    opptjeningsperiodeTom: '2024-01-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4Z4PBYC0X6VF6G8DV',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'uregelmessigeTilleggKnyttetTilArbeidetTid',
                    beløp: 10000.0,
                    måned: '2024-04',
                    opptjeningsperiodeFom: '2024-04-01',
                    opptjeningsperiodeTom: '2024-04-30',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4F3BA132MXHKS86JV',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'uregelmessigeTilleggKnyttetTilArbeidetTid',
                    beløp: 10000.0,
                    måned: '2024-02',
                    opptjeningsperiodeFom: '2024-02-01',
                    opptjeningsperiodeTom: '2024-02-29',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4N4J4SS2NZV9HJE18',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'uregelmessigeTilleggKnyttetTilArbeidetTid',
                    beløp: 10000.0,
                    måned: '2024-03',
                    opptjeningsperiodeFom: '2024-03-01',
                    opptjeningsperiodeTom: '2024-03-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C40FBRKQE2G8R9Y258',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'loennUtbetaltAvVeldedigEllerAllmennyttigInstitusjonEllerOrganisasjon',
                    beløp: 423.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-01',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4PP7TM0715WBBMC7N',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 10000.0,
                    måned: '2024-02',
                    opptjeningsperiodeFom: '2024-02-01',
                    opptjeningsperiodeTom: '2024-02-29',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4CREVM3QEQSVPSTBJ',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 2000.0,
                    måned: '2024-04',
                    opptjeningsperiodeFom: '2024-04-01',
                    opptjeningsperiodeTom: '2024-04-30',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4TES09VNKYAPSQ1V9',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 10000.0,
                    måned: '2024-03',
                    opptjeningsperiodeFom: '2024-03-01',
                    opptjeningsperiodeTom: '2024-03-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4FAH5HAKPBF904DZC',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 10000.0,
                    måned: '2024-01',
                    opptjeningsperiodeFom: '2024-01-01',
                    opptjeningsperiodeTom: '2024-01-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4ZDDXF82WRQKVW71E',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 2000.0,
                    måned: '2024-01',
                    opptjeningsperiodeFom: '2024-01-01',
                    opptjeningsperiodeTom: '2024-01-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4ZAE691PTMT8VZA4E',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'trekkILoennForFerie',
                    beløp: -1200.0,
                    måned: '2024-02',
                    opptjeningsperiodeFom: '2024-02-01',
                    opptjeningsperiodeTom: '2024-02-29',
                    erOpptjentIPeriode: undefined,
                    id: '01HMGWC4C443MYEK7DX1J0W2DJ',
                    erMedIInntektsgrunnlag: false,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'trekkILoennForFerie',
                    beløp: -1200.0,
                    måned: '2024-01',
                    opptjeningsperiodeFom: '2024-01-01',
                    opptjeningsperiodeTom: '2024-01-31',
                    erOpptjentIPeriode: undefined,
                    id: '01HMGWC4C4NVGZJZ42R2DGBNR9',
                    erMedIInntektsgrunnlag: false,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 10000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-01',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C47406EZBKTQCHMRZ2',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 2000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-01',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4SC487EP9D1YB2DQ2',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'uregelmessigeTilleggKnyttetTilArbeidetTid',
                    beløp: 10000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-01',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4JNK24VFTHQD04D7E',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'trekkILoennForFerie',
                    beløp: -1200.0,
                    måned: '2024-04',
                    opptjeningsperiodeFom: '2024-04-01',
                    opptjeningsperiodeTom: '2024-04-30',
                    erOpptjentIPeriode: undefined,
                    id: '01HMGWC4C4AGE8FGYXC2T2NJTC',
                    erMedIInntektsgrunnlag: false,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'loennUtbetaltAvVeldedigEllerAllmennyttigInstitusjonEllerOrganisasjon',
                    beløp: 423.0,
                    måned: '2024-03',
                    opptjeningsperiodeFom: '2024-03-01',
                    opptjeningsperiodeTom: '2024-03-31',
                    erOpptjentIPeriode: false,
                    id: '01HMGWC4C4E3RM19CHD7ST122N',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'trekkILoennForFerie',
                    beløp: -1200.0,
                    måned: '2024-03',
                    opptjeningsperiodeFom: '2024-03-01',
                    opptjeningsperiodeTom: '2024-03-31',
                    erOpptjentIPeriode: undefined,
                    id: '01HMGWC4C4YX5RHKJKHQ1WA5QY',
                    erMedIInntektsgrunnlag: false,
                },
            ],
            bruttoLønn: 108115.0,
            innhentetTidspunkt: '2024-01-19T13:50:45.252916',
        },
        bedriftKontonummer: '10000008145',
        bedriftKontonummerInnhentetTidspunkt: '2022-05-03T12:45:32.115072',
        bedriftKid: undefined,
        inntekterKunFraTiltaket: undefined,
        endretBruttoLønn: undefined,
        fratrekkRefunderbarBeløp: undefined,
        harFerietrekkForSammeMåned: false,
        forrigeRefusjonMinusBeløp: 0,
        beregning: undefined,
    },
    bedriftNr: '999999999',
    deltakerFnr: '28128521498',
    id: '01HMGST2JDNRY6YEQ4944BKRHC',
    fristForGodkjenning: '2024-02-29',
    forrigeFristForGodkjenning: undefined,
    unntakOmInntekterFremitid: 4,
    hentInntekterLengerFrem: 'foobar',
    godkjentAvArbeidsgiver: '2024-01-19T12:51:19.497278Z',
    status: RefusjonStatus.GODKJENT_NULLBELØP,
    korreksjonId: undefined,
    harTattStillingTilAlleInntektslinjer: true,
    harInntektIAlleMåneder: false,
    åpnetFørsteGang: '2024-01-22T15:55:56.514591Z',
    sistEndret: '2024-01-22T15:56:06.292479Z',
};

export const RefusjonNullbelop: Story = {
    name: 'Refusjon med nullbeløp',
    args: {
        refusjon: refusjonMedNullbelop,
        innloggetBruker: { identifikator: '', harKorreksjonTilgang: false, rolle: 'ARBEIDSGIVER' },
    },
    decorators: [
        (Story, args) => (
            <div>
                <h1>KvitteringSide: Refusjon med nullbeløp</h1>
                <p>
                    Arbeidsgiveren har ikke oppgitt noe opptjent lønn i perioden, og dermed er det ikke noe penger å
                    utbetale.
                </p>
                <Story {...args} />
            </div>
        ),
    ],
};
