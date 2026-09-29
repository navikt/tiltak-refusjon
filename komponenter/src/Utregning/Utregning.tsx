import { ExpansionCard, Heading, VStack } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import Utregningsrad from './Utregningsrad';

import { Tilskuddsgrunnlag, Inntektsgrunnlag } from '~/types/refusjon';
import { Fortegn, UtregningsLinjeType, Utregning as UtregningType } from '~/types/utregning';
import { erNil } from '~/utils/predicates';
import UtregningsradHvaInngårIDette from './UtregningsradHvaInngårIDette';
import style from './Utregning.module.less';
import UtgårÅrsakBeskrivelse from './UtgaarGrunn';

interface Props {
    utregning?: UtregningType;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
    inntektsgrunnlag?: Inntektsgrunnlag;
}

const Utregning: FunctionComponent<Props> = (props) => {
    const { tilskuddsgrunnlag, utregning, inntektsgrunnlag } = props;

    if (erNil(utregning)) {
        return;
    }

    const bruttoLønnsInntekter = inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.erMedIInntektsgrunnlag && inntekt.erOpptjentIPeriode === true
    );
    const ferietrekkInntekter = props.inntektsgrunnlag?.inntekter.filter(
        (inntekt) => inntekt.beskrivelse === 'trekkILoennForFerie'
    );

    return (
        <ExpansionCard aria-label="Beregning av tilskudd" defaultOpen={true} size="small">
            <ExpansionCard.Header>
                <Heading level="3" size="medium">
                    Beregning av tilskudd
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                {utregning.grupper.map((gruppe, index) => (
                    <VStack className={style.gruppe} key={index}>
                        {gruppe.map((rad, radIndex) => (
                            <Utregningsrad
                                utregningslinje={rad}
                                graaBakgrunn={radIndex === 0 && rad.fortegn === Fortegn.ER_LIK}
                                uthevet={rad.type === UtregningsLinjeType.REFUSJONSBELOP_TIL_UTBETALING}
                                key={radIndex}
                            >
                                {rad.type === UtregningsLinjeType.BRUTTOLONN_I_PERIODEN && (
                                    <UtregningsradHvaInngårIDette
                                        inntekter={bruttoLønnsInntekter ?? []}
                                        tilskuddsgrunnlag={tilskuddsgrunnlag}
                                    />
                                )}
                                {rad.type === UtregningsLinjeType.FERIETREKK && (
                                    <UtregningsradHvaInngårIDette
                                        inntekter={ferietrekkInntekter ?? []}
                                        tilskuddsgrunnlag={props.tilskuddsgrunnlag}
                                    />
                                )}
                                {rad.utgårGrunn && <UtgårÅrsakBeskrivelse utgårÅrsak={rad.utgårGrunn} />}
                            </Utregningsrad>
                        ))}
                    </VStack>
                ))}
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default Utregning;
