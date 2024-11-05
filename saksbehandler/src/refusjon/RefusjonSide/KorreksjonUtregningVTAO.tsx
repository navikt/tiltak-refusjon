import { BankNoteIcon, PercentIcon } from '@navikt/aksel-icons';
import ErlikTegn from '@/asset/image/erlikTegn.svg?react';
import MinusTegn from '@/asset/image/minusTegn.svg?react';
import PlussTegn from '@/asset/image/plussTegn.svg?react';
import { BodyShort, Heading, ReadMore } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '../../komponenter/VerticalSpacer';
import { formatterPenger } from '../../utils/PengeUtils';
import Utregningsrad from './Utregningsrad';
import './Utregning.less';
import UtregningsradHvaInngårIDette from './UtregningsradHvaInngårIDette';
import { Beregning, Inntektsgrunnlag, Tilskuddsgrunnlag } from '~/types/refusjon';
import BEMHelper from '~/utils/bem';
import EksternLenke from '~/EksternLenke/EksternLenke';

interface Props {
    refusjonsnummer: {
        avtalenr: number;
        løpenummer: number;
    };
    erKorreksjon: boolean;
    beregning?: Beregning;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    forrigeRefusjonMinusBeløp?: number;
    inntektsgrunnlag?: Inntektsgrunnlag;
}

const KorreksjonUtregningVTAO: FunctionComponent<Props> = (props) => {
    const cls = BEMHelper('utregning');

    const { beregning, tilskuddsgrunnlag, forrigeRefusjonMinusBeløp } = props;

    const refusjonsnummer = props.refusjonsnummer.avtalenr + '-' + props.refusjonsnummer.løpenummer;
    const beløpOver5G = beregning?.overFemGrunnbeløp;
    const beløpOverMaks = beregning && (beregning.overTilskuddsbeløp || beløpOver5G);
    const erKorreksjon = props.erKorreksjon;

    const tilUtbetaling = (tykkBunn: boolean) => (
        <Utregningsrad
            labelIkon={<BankNoteIcon />}
            labelTekst={'Refusjonsbeløp til utbetaling'}
            verdiOperator={<ErlikTegn />}
            verdi={(-tilskuddsgrunnlag.tilskuddsbeløp || 0) ?? 'kan ikke beregne'}
            ikkePenger={beregning === undefined}
            border={tykkBunn ? 'TYKK' : 'INGEN'}
        />
    );

    return (
        <div className={cls.className}>
            <Heading level="3" size="medium">
                Utregningen
            </Heading>
            <VerticalSpacer rem={1} />
            <Utregningsrad
                className={cls.element('grå-utregningsrad')}
                labelTekst="Refusjonsgrunnlag"
                verdiOperator={<ErlikTegn />}
                verdi={props.tilskuddsgrunnlag.tilskuddsbeløp || 0}
                border="TYKK"
            />
            <VerticalSpacer rem={2} />
            {erKorreksjon && (
                <div className={beløpOverMaks ? cls.element('korreksjons-oppsummering') : ''}>
                    {props.beregning?.tidligereUtbetalt != null && props.beregning?.tidligereUtbetalt !== 0 && (
                        <Utregningsrad
                            labelTekst={'Opprinnelig refusjonsbeløp fra refusjonsnummer ' + refusjonsnummer}
                            verdiOperator={props.beregning?.tidligereUtbetalt > 0 ? <MinusTegn /> : <PlussTegn />}
                            verdi={Math.abs(props.beregning?.tidligereUtbetalt ?? 0)}
                            ikkePenger={props.beregning === undefined}
                            border="INGEN"
                        >
                            {props.beregning?.tidligereUtbetalt < 0 && (
                                <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                                    <BodyShort size="small">
                                        Den opprinnelige refusjonen medførte et trekk på{' '}
                                        {formatterPenger(Math.abs(props.beregning?.tidligereUtbetalt))}.
                                    </BodyShort>
                                    <BodyShort size="small">Dette kompenseres for i denne beregningen.</BodyShort>
                                </ReadMore>
                            )}
                            {props.beregning?.tidligereUtbetalt >= 0 && (
                                <ReadMore size="small" header="Hva betyr dette?" defaultOpen={true}>
                                    <BodyShort size="small">
                                        Den opprinnelige refusjonen medførte en utbetaling på{' '}
                                        {formatterPenger(Math.abs(props.beregning?.tidligereUtbetalt))} dette trekkes
                                        fra denne beregningen.
                                    </BodyShort>
                                </ReadMore>
                            )}
                        </Utregningsrad>
                    )}
                    {tilUtbetaling(false)}
                </div>
            )}
        </div>
    );
};

export default KorreksjonUtregningVTAO;
