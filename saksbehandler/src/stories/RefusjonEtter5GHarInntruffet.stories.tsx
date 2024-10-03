import { InnloggetBruker } from '@/bruker/BrukerContextType';
import KvitteringSide from '@/refusjon/KvitteringSide/KvitteringSide';
import { Refusjon } from '@/refusjon/refusjon';
import { RefusjonStatus, Tiltak  } from '@/refusjon/refusjon';
import { Meta, StoryObj } from '@storybook/react';

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

const innloggetBruker : InnloggetBruker = {
    harKorreksjonTilgang: false,
    identifikator: "123456"
}

const etter5GRefusjon: Refusjon = {
    harInntektIAlleMåneder: true,
    refusjonsgrunnlag: {
        harFerietrekkForSammeMåned: false,
        tilskuddsgrunnlag: {
            avtaleId: '8931b3f3-c5e9-4041-9356-985f4415ec6a',
            tilskuddsperiodeId: '255109d2-3e64-4c48-98d6-696d8c616500',
            deltakerFornavn: 'Olav',
            deltakerEtternavn: 'Over5gsen',
            deltakerFnr: '08098138758',
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
        forrigeRefusjonMinusBeløp: 0,
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
    harTattStillingTilAlleInntektslinjer: true,
};

export const RefusjonEtter5G: Story = {
    name: 'Refusjon etter 5g har inntruffet',
    args: { refusjon: etter5GRefusjon, innloggetBruker },
};
