import Bygg from '@/asset/image/bygg.svg?react';
import ErlikTegn from '@/asset/image/erlikTegn.svg?react';
import MinusTegn from '@/asset/image/minusTegn.svg?react';
import PlussTegn from '@/asset/image/plussTegn.svg?react';
import Sparegris from '@/asset/image/sparegris.svg?react';
import Stranden from '@/asset/image/strand.svg?react';
import { Heading } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import Utregningsrad from './Utregningsrad';
import VerticalSpacer from '~/VerticalSpacer';
import './Utregning.less';
import { Inntektsgrunnlag, Tilskuddsgrunnlag } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';
import { erNil } from '~/utils/predicates';

interface Props {
    refusjonsnummer?: {
        avtalenr: number;
        løpenummer: number;
    };
    erKorreksjon?: boolean;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    forrigeRefusjonMinusBeløp?: number;
    inntektsgrunnlag?: Inntektsgrunnlag;
    sumUtbetaltVarig?: number;
}

const UtregningMentor: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('utregning');

    const { tilskuddsgrunnlag } = props;

    if (erNil(tilskuddsgrunnlag)) return null;

    const lønn = tilskuddsgrunnlag.tilskuddsbeløp;
    const feriepenger = (tilskuddsgrunnlag.tilskuddsbeløp / 100) * (tilskuddsgrunnlag.feriepengerSats * 100);
    const tjenestepensjon = (tilskuddsgrunnlag.tilskuddsbeløp / 100) * (tilskuddsgrunnlag.otpSats * 100);

    const arbeidsgiveravgift =
        (tilskuddsgrunnlag.tilskuddsbeløp / 100) * (tilskuddsgrunnlag.arbeidsgiveravgiftSats * 100);

    const sumUtgifter = lønn + feriepenger + tjenestepensjon + arbeidsgiveravgift;

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
                labelTekst={`Bruttolønn i perioden. ${antalltimer(lønn || 0)}`}
                verdi={lønn || 0}
            ></Utregningsrad>
            <>
                <Utregningsrad
                    labelIkon={<Stranden />}
                    labelTekst="Feriepenger"
                    labelSats={props.tilskuddsgrunnlag.feriepengerSats}
                    verdiOperator={(feriepenger || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={Math.abs(feriepenger || 0)}
                />
                <Utregningsrad
                    labelIkon={<Sparegris />}
                    labelTekst="Innskudd obligatorisk tjenestepensjon"
                    labelSats={props.tilskuddsgrunnlag.otpSats}
                    verdiOperator={(tjenestepensjon || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={Math.abs(tjenestepensjon || 0)}
                />
                <Utregningsrad
                    labelIkon={<Bygg />}
                    labelTekst="Arbeidsgiveravgift"
                    labelSats={props.tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                    verdiOperator={(arbeidsgiveravgift || 0) >= 0 ? <PlussTegn /> : <MinusTegn />}
                    verdi={Math.abs(arbeidsgiveravgift || 0)}
                />
                <Utregningsrad
                    className={cls.element('grå-utregningsrad')}
                    labelTekst="Refusjonsgrunnlag"
                    verdiOperator={<ErlikTegn />}
                    verdi={sumUtgifter || 0}
                    border="TYKK"
                />
            </>
        </div>
    );
};

export default UtregningMentor;
