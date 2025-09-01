import Bygg from '@/asset/image/bygg.svg?react';
import Endret from '@/asset/image/endret.svg?react';
import ErlikTegn from '@/asset/image/erlikTegn.svg?react';
import MinusTegn from '@/asset/image/minusTegn.svg?react';
import Pengesekken from '@/asset/image/pengesekkdollar.svg?react';
import PlussTegn from '@/asset/image/plussTegn.svg?react';
import Sparegris from '@/asset/image/sparegris.svg?react';
import Stranden from '@/asset/image/strand.svg?react';
import { Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import Utregningsrad from './Utregningsrad';
import VerticalSpacer from '~/VerticalSpacer';
import './Utregning.less';
import { Beregning, Inntektsgrunnlag, Tilskuddsgrunnlag } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';

interface Props {
    refusjonsnummer?: {
        avtalenr: number;
        løpenummer: number;
    };
    erKorreksjon?: boolean;
    beregning?: Beregning;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    forrigeRefusjonMinusBeløp?: number;
    inntektsgrunnlag?: Inntektsgrunnlag;
    sumUtbetaltVarig?: number;
}

const UtregningMentor: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('utregning');

    const { beregning } = props;
    /*
    const bruttoLønnsInntekter = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag && inntekt.erOpptjentIPeriode === true
    );
    const ferietrekkInntekter = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.beskrivelse === 'trekkILoennForFerie'
    );
    */
    /*
    const tilUtbetaling = (tykkBunn: boolean) => (
        <Utregningsrad
            labelIkon={<BankNoteIcon />}
            labelTekst={'Refusjonsbeløp til utbetaling'}
            verdiOperator={<ErlikTegn />}
            verdi={(beregning?.refusjonsbeløp || 0) ?? 'kan ikke beregne'}
            ikkePenger={beregning === undefined}
            border={tykkBunn ? 'TYKK' : 'INGEN'}
        />
    );
    */

    const antalltimer = (lønn: number) => {
        return lønn / 1000;
    };

    return (
        <div className={cls.className}>
            <Heading level="3" size="medium">
                Utregningen
            </Heading>
            <VerticalSpacer rem={1} />
            <Utregningsrad
                labelTekst={`Bruttolønn i perioden. ${antalltimer(beregning?.lønn || 0)}`}
                verdi={beregning?.lønn || 0}
            ></Utregningsrad>
            {beregning && beregning.fratrekkLønnFerie !== 0 && (
                <Utregningsrad
                    labelIkon={<Stranden />}
                    labelTekst="Fratrekk for ferie (hentet fra A-meldingen)"
                    verdiOperator={beregning.fratrekkLønnFerie < 0 ? <MinusTegn /> : <PlussTegn />}
                    verdi={
                        beregning.fratrekkLønnFerie < 0 ? beregning.fratrekkLønnFerie * -1 : beregning.fratrekkLønnFerie
                    }
                ></Utregningsrad>
            )}
            <>
                <Utregningsrad
                    labelIkon={<Stranden />}
                    labelTekst="Feriepenger"
                    labelSats={props.tilskuddsgrunnlag.feriepengerSats}
                    verdiOperator={(beregning?.feriepenger || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={Math.abs(beregning?.feriepenger || 0)}
                />
                <Utregningsrad
                    labelIkon={<Sparegris />}
                    labelTekst="Innskudd obligatorisk tjenestepensjon"
                    labelSats={props.tilskuddsgrunnlag.otpSats}
                    verdiOperator={(beregning?.tjenestepensjon || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={Math.abs(beregning?.tjenestepensjon || 0)}
                />
                <Utregningsrad
                    labelIkon={<Bygg />}
                    labelTekst="Arbeidsgiveravgift"
                    labelSats={props.tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                    verdiOperator={(beregning?.arbeidsgiveravgift || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={Math.abs(beregning?.arbeidsgiveravgift || 0)}
                    border={beregning && beregning?.tidligereRefundertBeløp > 0 ? 'TYKK' : undefined}
                />
                {beregning && beregning?.tidligereRefundertBeløp > 0 ? (
                    <>
                        <Utregningsrad
                            labelIkon={<Pengesekken />}
                            labelTekst="Sum brutto lønnsutgifter"
                            verdiOperator={<ErlikTegn />}
                            verdi={beregning?.sumUtgifter || 0}
                        />
                        <Utregningsrad
                            labelIkon={<Endret />}
                            labelTekst="Refunderbar lønn"
                            verdiOperator={<MinusTegn />}
                            verdi={beregning?.tidligereRefundertBeløp}
                        />
                        <Utregningsrad
                            className={cls.element('grå-utregningsrad')}
                            labelTekst="Refusjonsgrunnlag"
                            verdiOperator={<ErlikTegn />}
                            verdi={beregning?.sumUtgifterFratrukketRefundertBeløp}
                            border="TYKK"
                        />
                    </>
                ) : (
                    <Utregningsrad
                        className={cls.element('grå-utregningsrad')}
                        labelTekst="Refusjonsgrunnlag"
                        verdiOperator={<ErlikTegn />}
                        verdi={beregning?.sumUtgifter || 0}
                        border="TYKK"
                    />
                )}
            </>
        </div>
    );
};

export default UtregningMentor;
