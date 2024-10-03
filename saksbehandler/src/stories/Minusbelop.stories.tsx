import type { Meta, StoryObj } from '@storybook/react';

import Utregning from '@/refusjon/RefusjonSide/Utregning';
import { Tiltak } from '@/refusjon/refusjon';

const meta = {
    title: 'Refusjons Saksbehandler/Utregning',
    args: {},
    parameters: {
        layout: 'fullscreen',
    },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const refusjon1 = {
    refusjonsnummer: { avtalenr: 123, løpenummer: 3 },
    forrigeRefusjonMinusBeløp: 0,
    erKorreksjon: false,
    beregning: {
        lønn: 20000,
        lønnFratrukketFerie: -5000,
        feriepenger: -625,
        tjenestepensjon: -169,
        arbeidsgiveravgift: -817,
        sumUtgifter: -6611,
        beregnetBeløp: -3966,
        refusjonsbeløp: -3966,
        overTilskuddsbeløp: false,
        tidligereUtbetalt: 0,
        fratrekkLønnFerie: -25000,
        tidligereRefundertBeløp: 0,
        sumUtgifterFratrukketRefundertBeløp: -6611,
        overFemGrunnbeløp: false,
        id: '01HKMNXG6FTAMAMQZG5K2X1DHZ',
    },
    tilskuddsgrunnlag: {
        avtaleId: 'e34682c9-aaa5-4c15-9744-7d7d0f43b4f5',
        tilskuddsperiodeId: 'b16929c1-3d15-4497-a9ff-b20becd9a857',
        deltakerFornavn: 'Jon',
        deltakerEtternavn: 'Janson Ferietrekk minus beløp 1',
        deltakerFnr: '08124521514',
        veilederNavIdent: 'Z123456',
        bedriftNavn: 'Kiwi Majorstuen',
        bedriftNr: '910712306',
        tilskuddFom: '2023-12-01',
        tilskuddTom: '2023-12-31',
        feriepengerSats: 0.125,
        otpSats: 0.03,
        arbeidsgiveravgiftSats: 0.141,
        tiltakstype: Tiltak.SOMMERJOBB,
        tilskuddsbeløp: 30000,
        lønnstilskuddsprosent: 60,
        avtaleNr: 7,
        løpenummer: 1,
        enhet: '1000',
        id: '01HKM5N9F6RDQF0H4Y2T3R1G82',
    },
    inntektsgrunnlag: {
        inntekter: [
            {
                inntektType: 'LOENNSINNTEKT',
                beskrivelse: 'fastloenn',
                beløp: 20000,
                måned: '2023-12',
                opptjeningsperiodeFom: '2024-01-31',
                opptjeningsperiodeTom: '2023-12-31',
                erOpptjentIPeriode: true,
                id: '01HKMNX9G68PZQ5E0NYMWJNKHC',
                erMedIInntektsgrunnlag: true,
            },
            {
                inntektType: 'LOENNSINNTEKT',
                beskrivelse: 'trekkILoennForFerie',
                beløp: -25000,
                måned: '2023-12',
                opptjeningsperiodeFom: '2024-01-31',
                opptjeningsperiodeTom: '2023-12-31',
                erOpptjentIPeriode: false,
                id: '01HKMNX9G67EJANJE328RR0S4C',
                erMedIInntektsgrunnlag: false,
            },
        ],
        bruttoLønn: 20000,
        innhentetTidspunkt: '2024-01-08T14:59:03.430177',
    },
};

const refusjon2 = {
    refusjonsnummer: { avtalenr: 123, løpenummer: 3 },
    erKorreksjon: false,
    forrigeRefusjonMinusBeløp: -3966,
    beregning: {
        lønn: 20000,
        lønnFratrukketFerie: 20000,
        feriepenger: 2500,
        tjenestepensjon: 675,
        arbeidsgiveravgift: 3268,
        sumUtgifter: 26443,
        beregnetBeløp: 15866,
        refusjonsbeløp: 11900,
        overTilskuddsbeløp: false,
        tidligereUtbetalt: 0,
        fratrekkLønnFerie: 0,
        tidligereRefundertBeløp: 0,
        sumUtgifterFratrukketRefundertBeløp: 26443,
        overFemGrunnbeløp: false,
        id: '01HKMPAD0Q6SWXXEJDA626E350',
    },
    tilskuddsgrunnlag: {
        avtaleId: 'd48ebe92-6251-420e-94f9-bba225cc9040',
        tilskuddsperiodeId: '050714d5-211e-4462-ba1c-4b0923647a82',
        deltakerFornavn: 'Jon',
        deltakerEtternavn: 'Janson Ferietrekk minus beløp 2',
        deltakerFnr: '08124521514',
        veilederNavIdent: 'Z123456',
        bedriftNavn: 'Kiwi Majorstuen',
        bedriftNr: '910712306',
        tilskuddFom: '2023-12-01',
        tilskuddTom: '2023-12-31',
        feriepengerSats: 0.125,
        otpSats: 0.03,
        arbeidsgiveravgiftSats: 0.141,
        tiltakstype: Tiltak.SOMMERJOBB,
        tilskuddsbeløp: 20000,
        lønnstilskuddsprosent: 60,
        avtaleNr: 7,
        løpenummer: 2,
        resendingsnummer: 1,
        enhet: '1000',
        id: '01HKM5N9F6Z4PJRAWDAJTK2GGA',
    },
    inntektsgrunnlag: {
        inntekter: [
            {
                inntektType: 'LOENNSINNTEKT',
                beskrivelse: 'fastloenn',
                beløp: 20000,
                måned: '2023-12',
                opptjeningsperiodeFom: '2024-01-31',
                opptjeningsperiodeTom: '2023-12-31',
                erOpptjentIPeriode: true,
                id: '01HKMPA5EB8239MAN9YVH65B26',
                erMedIInntektsgrunnlag: true,
            },
            {
                inntektType: 'LOENNSINNTEKT',
                beskrivelse: 'trekkILoennForFerie',
                beløp: -25000,
                måned: '2023-12',
                opptjeningsperiodeFom: '2024-01-31',
                opptjeningsperiodeTom: '2023-12-31',
                erOpptjentIPeriode: false,
                id: '01HKMPA5EBEQHQ9FNQZH9SJD28',
                erMedIInntektsgrunnlag: false,
            },
        ],
        bruttoLønn: 20000,
        id: '01HKMPA5EBMHCKKWGSX3X2RJFJ',
        innhentetTidspunkt: '2024-01-08T15:06:05.259711',
    },
};

export const Minusbelop: Story = {
    name: 'Minusbeløp grunnet ferietrekk',
    args: {},
    render: (args) => (
        <div>
            <h1>Minusbeløp som gjøres opp i påfølgende periode</h1>
            <h2>Utregning: Refusjon 1</h2>
            I dette tilskuddet er det lagt på ferietrekk som fører til at arbeidsgiver blir skyldig penger.
            <Utregning {...refusjon1} />
            <h2>Utregning: Refusjon 2</h2>
            Her gjøres minusbeløpet fra forrige refusjon opp
            <Utregning {...refusjon2} />
        </div>
    ),
};
