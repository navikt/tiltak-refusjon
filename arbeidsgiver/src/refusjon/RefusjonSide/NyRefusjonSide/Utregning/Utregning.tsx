import { Box, ExpansionCard } from '@navikt/ds-react';
import React from 'react';
import { Refusjon } from '~/types';
import UtregningKomponent from '@/komponenter/Utregning';

interface Props {
    refusjon: Refusjon;
}

function Utregning(props: Props) {
    const {
        refusjon: {
            refusjonsgrunnlag: {
                tilskuddsgrunnlag,
                beregning,
                forrigeRefusjonMinusBeløp,
                inntektsgrunnlag,
                sumUtbetaltVarig,
            },
        },
    } = props;

    return (
        <ExpansionCard aria-labelledby="utregningen-tittel" defaultOpen>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h2" id="utregningen-tittel">
                    Utregningen
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Box overflowX="auto">
                    <UtregningKomponent
                        refusjonsnummer={{
                            avtalenr: tilskuddsgrunnlag.avtaleNr,
                            løpenummer: tilskuddsgrunnlag.løpenummer,
                        }}
                        erKorreksjon={false}
                        forrigeRefusjonMinusBeløp={forrigeRefusjonMinusBeløp || 0}
                        beregning={beregning}
                        tilskuddsgrunnlag={tilskuddsgrunnlag}
                        inntektsgrunnlag={inntektsgrunnlag}
                        skjulTittel
                        sumUtbetaltVarig={sumUtbetaltVarig}
                        visRamme={false}
                    />
                </Box>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
}

export default Utregning;
