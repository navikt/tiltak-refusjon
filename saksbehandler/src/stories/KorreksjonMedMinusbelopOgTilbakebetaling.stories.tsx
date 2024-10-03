import KorreksjonKvitteringSide from '@/KorreksjonKvitteringSide/KorreksjonKvitteringSide';
import { Korreksjon, Korreksjonsgrunn, Tiltak, KorreksjonStatus } from '@/refusjon/refusjon';
import { Meta, StoryObj } from '@storybook/react';

const meta = {
    title: 'Refusjons Saksbehandler/Korreksjon kvittering',
    component: KorreksjonKvitteringSide,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof KorreksjonKvitteringSide>;

export default meta;
type Story = StoryObj<typeof meta>;

const korreksjon: Korreksjon = {
    korrigererRefusjonId: '01HMRY4Y4RRKBW8QT5VQAHRA58',
    refusjonsgrunnlag: {
        tilskuddsgrunnlag: {
            avtaleId: 'd5c44c9c-1a97-4db3-abbd-5c738aec0613',
            tilskuddsperiodeId: '2f6c1c6a-a1d5-4797-8690-8530a8bbf92f',
            deltakerFornavn: 'Formye',
            deltakerEtternavn: 'Ferietrekksen',
            deltakerFnr: '28061827902',
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
        harFerietrekkForSammeMåned: false,
        fratrekkRefunderbarBeløp: undefined,
        forrigeRefusjonMinusBeløp: 0,
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
    harInntektIAlleMåneder: false,
    harTattStillingTilAlleInntektslinjer: true,
};

export const KorreksjonMedMinusbelopOgTilbakebetaling: Story = {
    name: 'Korreksjon med minusbeløp og tilbakebetaling',
    args: { korreksjon: korreksjon },
    decorators: [
        (Story, args) => (
            <div>
                <h1>KvitteringKorreksjon: Korreksjon med minusbeløp og tilbakebetaling</h1>
                <Story {...args} />
            </div>
        ),
    ],
};
