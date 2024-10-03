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

const førOver5GRefusjon: Refusjon = {
    harInntektIAlleMåneder: true,
    refusjonsgrunnlag: {
        harFerietrekkForSammeMåned: false,
        tilskuddsgrunnlag: {
            avtaleId: 'd9f6b823-6e8b-4f66-aca5-52c1dbdb0282',
            tilskuddsperiodeId: 'a85317ca-c0b2-496a-95a0-05944595ef76',
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
        forrigeRefusjonMinusBeløp: 0,
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
    harTattStillingTilAlleInntektslinjer: true,
};

export const RefusjonFør5G: Story = {
    name: 'Refusjon før 5g overskrides',
    args: { refusjon: førOver5GRefusjon, innloggetBruker }
};
