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

const over5gRefusjon: Refusjon = {
    harInntektIAlleMåneder: true,
    refusjonsgrunnlag: {
        harFerietrekkForSammeMåned: false,
        tilskuddsgrunnlag: {
            avtaleId: '4d34c301-22c1-4671-8295-d3c4099c67df',
            tilskuddsperiodeId: '16e119f2-cc28-4f8c-b6b9-8b5754cf83d7',
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
        forrigeRefusjonMinusBeløp: 0,
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
    harTattStillingTilAlleInntektslinjer: true,
};

export const RefusjonOverskrider5G: Story = {
    name: 'Refusjon overskrider 5g',
    args: { refusjon: over5gRefusjon, innloggetBruker },
};
