import KvitteringKorreksjon from '@/refusjon/KvitteringKorreksjon/KvitteringKorreksjon';

import { Meta, StoryObj } from '@storybook/react';
import { Diskresjonskode } from '~/types';
import { Korreksjon, Korreksjonsgrunn, Refusjon } from '~/types/refusjon';
import { KorreksjonStatus, RefusjonStatus } from '~/types/status';
import { Tiltak } from '~/types/tiltak';

const meta = {
    title: 'KvitteringKorreksjon',
    component: KvitteringKorreksjon,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof KvitteringKorreksjon>;

export default meta;
type Story = StoryObj<typeof meta>;

const refusjon: Refusjon = {
    refusjonsgrunnlag: {
        tilskuddsgrunnlag: {
            avtaleId: 'd5c44c9c-1a97-4db3-abbd-5c738aec0613',
            avtaleFom: undefined,
            avtaleTom: undefined,
            tilskuddsperiodeId: '2f6c1c6a-a1d5-4797-8690-8530a8bbf92f',
            deltakerFornavn: 'Formye',
            deltakerEtternavn: 'Ferietrekksen',
            deltakerFnr: '28061827902',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'Z123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-12-01',
            tilskuddTom: '2023-12-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 13337,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HMRY4Y4RAJJN459TD4GR5BGH',
        },
        inntektsgrunnlag: {
            inntekter: [
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 30000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: false,
                    id: '01HMRY5C76KY3AB59RK8HZY0VS',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'trekkILoennForFerie',
                    beløp: -35000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: undefined,
                    id: '01HMRY5C73NSNAV9V59CZWQJMC',
                    erMedIInntektsgrunnlag: false,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 2000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: true,
                    id: '01HMRY5C76JA8JM24TCGF9K7C5',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 30000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: false,
                    id: '01HMRY5C73TZRM2Z25JMBDS304',
                    erMedIInntektsgrunnlag: true,
                },
            ],
            bruttoLønn: 62000.0,
            innhentetTidspunkt: '2024-01-22T16:55:56.518432',
        },
        bedriftKontonummer: '10000008145',
        bedriftKid: undefined,
        inntekterKunFraTiltaket: true,
        endretBruttoLønn: undefined,
        fratrekkRefunderbarBeløp: false,
        refunderbarBeløp: undefined,
        forrigeRefusjonMinusBeløp: 0,
        harFerietrekkForSammeMåned: false,
        beregning: {
            lønn: 2000,
            lønnFratrukketFerie: -33000,
            feriepenger: -3960,
            tjenestepensjon: -739,
            arbeidsgiveravgift: -5316,
            sumUtgifter: -43015,
            beregnetBeløp: -17206,
            refusjonsbeløp: -17206,
            overTilskuddsbeløp: false,
            tidligereUtbetalt: 0,
            fratrekkLønnFerie: -35000,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: -43015,
            overFemGrunnbeløp: false,
            id: '01HMRY5NRKY8X17XB8VQ9KTEFD',
        },
    },
    bedriftNr: '999999999',
    deltakerFnr: '28061827902',
    id: '01HMRY4Y4RRKBW8QT5VQAHRA58',
    fristForGodkjenning: '2024-02-29',
    forrigeFristForGodkjenning: undefined,
    unntakOmInntekterFremitid: 0,
    hentInntekterLengerFrem: 'foobar',
    godkjentAvArbeidsgiver: '2024-01-22T15:56:12.491915Z',
    status: RefusjonStatus.KORRIGERT,
    korreksjonId: '01HMRY76T65RTNQV0T43MDCE8B',
    utbetaltTidspunkt: undefined,
    harInntektIAlleMåneder: false,
    åpnetFørsteGang: '2024-01-22T15:55:56.514591Z',
    sistEndret: '2024-01-22T15:56:06.292479Z',
    harTattStillingTilAlleInntektslinjer: true,
    senestMuligeGodkjenningsfrist: '2024-04-29',
    diskresjonskode: Diskresjonskode.UGRADERT,
};

const korreksjon: Korreksjon = {
    korrigererRefusjonId: '01HMRY4Y4RRKBW8QT5VQAHRA58',
    refusjonsgrunnlag: {
        tilskuddsgrunnlag: {
            avtaleId: 'd5c44c9c-1a97-4db3-abbd-5c738aec0613',
            avtaleFom: undefined,
            avtaleTom: undefined,
            tilskuddsperiodeId: '2f6c1c6a-a1d5-4797-8690-8530a8bbf92f',
            deltakerFornavn: 'Formye',
            deltakerEtternavn: 'Ferietrekksen',
            deltakerFnr: '28061827902',
            arbeidsgiverFornavn: 'Arne',
            arbeidsgiverEtternavn: 'Arbeidsgiver',
            arbeidsgiverTlf: '41111111',
            veilederNavIdent: 'Z123456',
            bedriftNavn: 'Kiwi Majorstuen',
            bedriftNr: '999999999',
            tilskuddFom: '2023-12-01',
            tilskuddTom: '2023-12-31',
            feriepengerSats: 0.12,
            otpSats: 0.02,
            arbeidsgiveravgiftSats: 0.141,
            tiltakstype: Tiltak.SOMMERJOBB,
            tilskuddsbeløp: 13337,
            lønnstilskuddsprosent: 40,
            avtaleNr: 3456,
            løpenummer: 3,
            enhet: '1000',
            id: '01HMRY4Y4RAJJN459TD4GR5BGH',
        },
        inntektsgrunnlag: {
            inntekter: [
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'trekkILoennForFerie',
                    beløp: -35000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: undefined,
                    id: '01HMRY78HE9NGDYGDQ7QTEQY16',
                    erMedIInntektsgrunnlag: false,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'loennUtbetaltAvVeldedigEllerAllmennyttigInstitusjonEllerOrganisasjon',
                    beløp: 2000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: true,
                    id: '01HMRY78HEZHPKP0K48ACZ543D',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 30000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2024-01-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: true,
                    id: '01HMRY78HEJ37H64M2DXENG6XA',
                    erMedIInntektsgrunnlag: true,
                },
                {
                    inntektType: 'LOENNSINNTEKT',
                    beskrivelse: 'fastloenn',
                    beløp: 30000.0,
                    måned: '2023-12',
                    opptjeningsperiodeFom: '2023-12-31',
                    opptjeningsperiodeTom: '2023-12-31',
                    erOpptjentIPeriode: true,
                    id: '01HMRY78HECQSWZBFGJN52D6TN',
                    erMedIInntektsgrunnlag: true,
                },
            ],
            bruttoLønn: 62000.0,
            innhentetTidspunkt: '2024-01-22T16:56:58.286935',
        },
        bedriftKontonummer: '10000008145',
        bedriftKid: undefined,
        inntekterKunFraTiltaket: true,
        endretBruttoLønn: undefined,
        fratrekkRefunderbarBeløp: false,
        refunderbarBeløp: undefined,
        forrigeRefusjonMinusBeløp: 0,
        harFerietrekkForSammeMåned: false,
        beregning: {
            lønn: 62000,
            lønnFratrukketFerie: 27000,
            feriepenger: 3240,
            tjenestepensjon: 605,
            arbeidsgiveravgift: 4349,
            sumUtgifter: 35194,
            beregnetBeløp: 14078,
            refusjonsbeløp: 30543,
            overTilskuddsbeløp: true,
            tidligereUtbetalt: -17206,
            fratrekkLønnFerie: -35000,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: 35194,
            overFemGrunnbeløp: false,
            id: '01HMRY7EJZ3BC5Q80WR5ZWCN0V',
        },
    },
    deltakerFnr: '28061827902',
    bedriftNr: '999999999',
    id: '01HMRY76T65RTNQV0T43MDCE8B',
    korreksjonsgrunner: [Korreksjonsgrunn.HENT_INNTEKTER_PÅ_NYTT],
    status: KorreksjonStatus.TILLEGSUTBETALING,
    kostnadssted: '1000',
    godkjentTidspunkt: '2024-01-22T15:57:08.799741Z',
    unntakOmInntekterFremitid: 0,
    harInntektIAlleMåneder: false,
    harTattStillingTilAlleInntektslinjer: false,
    sistEndret: '2024-01-22T15:56:06.292479Z',
};

export const KorreksjonMedMinusbelopOgTilbakebetaling: Story = {
    name: 'Korreksjon med minusbeløp og tilbakebetaling',
    args: { korreksjon: korreksjon, refusjon: refusjon },
    decorators: [
        (Story, args) => (
            <div>
                <h1>KvitteringKorreksjon: Korreksjon med minusbeløp og tilbakebetaling</h1>
                <Story {...args} />
            </div>
        ),
    ],
};
