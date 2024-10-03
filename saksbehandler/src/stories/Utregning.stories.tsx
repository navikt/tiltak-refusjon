import type { Meta, StoryObj } from '@storybook/react';

import Utregning from '@/refusjon/RefusjonSide/Utregning';
import { Tiltak } from '@/refusjon/refusjon';

const meta = {
    title: 'Refusjons Saksbehandler/Utregning',
    component: Utregning,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Utregning>;

export default meta;
type Story = StoryObj<typeof meta>;

const fratrekkData = {
    refusjonsnummer: { avtalenr: 123, løpenummer: 3 },
    erKorreksjon: false,
    forrigeRefusjonMinusBeløp: -6558,
    beregning: {
        lønn: 108115,
        lønnFratrukketFerie: 108115,
        feriepenger: 12974,
        tjenestepensjon: 2422,
        arbeidsgiveravgift: 17415,
        sumUtgifter: 140926,
        beregnetBeløp: 56370,
        refusjonsbeløp: 14021,
        overTilskuddsbeløp: true,
        tidligereUtbetalt: 0,
        fratrekkLønnFerie: 0,
        tidligereRefundertBeløp: 0,
        sumUtgifterFratrukketRefundertBeløp: 140926,
        overFemGrunnbeløp: false,
        id: '01HKM6MGVB5ENFQRXTSSFAJN8C',
    },
    tilskuddsgrunnlag: {
        avtaleId: 'c2c91ca9-675a-464c-835a-5e6e7aaa2f0b',
        tilskuddsperiodeId: '260cc056-da57-4e53-9065-6c717897dc9f',
        deltakerFornavn: 'Bjørnstjerne',
        deltakerEtternavn: 'Bjørnson',
        deltakerFnr: '28128521498',
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
        id: '01HKM5N9F88835R2DSANTK3WPN',
    },
    inntektsgrunnlag: {
        inntekter: [],
        bruttoLønn: 108115,
        innhentetTidspunkt: '2024-01-08T10:31:43.265423',
    },
};

export const OppgjortMinusbeløp: Story = {
    name: 'Oppgjort minusbeløp',
    args: fratrekkData,

    decorators: [
        (Story, args) => (
            <div>
                <h1>Refusjon: Oppgjort minusbeløp, og over maks tilskudd</h1>
                <p>
                    Her har et ferietrekk ført til at en tidligere refusjon har gått i minus (arbeidsgiver er derfor
                    skyldig penger). Da må det beløpet trekkes fra i oppgjøret.
                </p>
                <p>Arbeidsgiver har også markert lønn som overstiger det avtalte tilskuddsbeløpet.</p>
                <Story {...args} />
            </div>
        ),
    ],
};

export const MangeInntektslinjer: Story = {
    name: 'Minusbeløp og mange inntektslinjer',
    args: {
        forrigeRefusjonMinusBeløp: -6558,
        refusjonsnummer: { avtalenr: 123, løpenummer: 3 },
        erKorreksjon: false,
        beregning: {
            lønn: 108115,
            lønnFratrukketFerie: 108115,
            feriepenger: 12974,
            tjenestepensjon: 2422,
            arbeidsgiveravgift: 17415,
            sumUtgifter: 140926,
            beregnetBeløp: 56370,
            refusjonsbeløp: 14021,
            overTilskuddsbeløp: true,
            tidligereUtbetalt: 0,
            fratrekkLønnFerie: 0,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: 140926,
            overFemGrunnbeløp: false,
            id: '01HKM7YXHNFW7V5N92MG5D89RE',
        },
        tilskuddsgrunnlag: {
            avtaleId: 'c2c91ca9-675a-464c-835a-5e6e7aaa2f0b',
            tilskuddsperiodeId: '260cc056-da57-4e53-9065-6c717897dc9f',
            deltakerFornavn: 'Bjørnstjerne',
            deltakerEtternavn: 'Bjørnson',
            deltakerFnr: '28128521498',
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
            id: '01HKM5N9F88835R2DSANTK3WPN',
        },
        inntektsgrunnlag: {
            inntekter: [],
            bruttoLønn: 108115,
            innhentetTidspunkt: '2024-01-08T10:54:55.585342',
        },
    },
    decorators: [
        (Story, args) => (
            <div>
                <h1>Refusjon: Mange inntektslinjer</h1>
                <p>Arbeidsgiver har markert veldig mange inntektslinjer</p>
                <Story {...args} />
            </div>
        ),
    ],
};

export const KorreksjonTidligereUtbetalt: Story = {
    args: {
        refusjonsnummer: { avtalenr: 123, løpenummer: 3 },
        erKorreksjon: true,
        beregning: {
            lønn: 32000,
            lønnFratrukketFerie: -3000,
            feriepenger: -360,
            tjenestepensjon: -67,
            arbeidsgiveravgift: -483,
            sumUtgifter: -3910,
            beregnetBeløp: -1564,
            refusjonsbeløp: 15642,
            overTilskuddsbeløp: false,
            tidligereUtbetalt: -17206,
            fratrekkLønnFerie: -35000,
            tidligereRefundertBeløp: 0,
            sumUtgifterFratrukketRefundertBeløp: -3910,
            overFemGrunnbeløp: false,
            id: '01HKM6F11VQ5PCFQF5HYTQRJ4D',
        },
        tilskuddsgrunnlag: {
            avtaleId: 'a6d15904-3494-440a-9569-e4c486ba517e',
            tilskuddsperiodeId: '5027bfa9-e581-4acd-b9c4-1f237d0256e7',
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
            id: '01HKM5N9FCCAXXEHA5KZXTCV6B',
        },
        forrigeRefusjonMinusBeløp: 0,
        inntektsgrunnlag: {
            inntekter: [],
            bruttoLønn: 62000,
            innhentetTidspunkt: '2024-01-08T10:29:07.387322',
        },
    },
    decorators: [
        (Story, args) => (
            <div>
                <h1>Korreksjon: Tidligere skyldig beløp gir positivt utbetaling</h1>
                <p>
                    Korreksjonen fører til minusbeløp (ferietrekk), men et tidligere minusbeløp har gjort arbeidsgiver
                    skyldig mye mer enn antatt, så de får dermed utbetalt penger
                </p>
                <Story {...args} />
            </div>
        ),
    ],
};
