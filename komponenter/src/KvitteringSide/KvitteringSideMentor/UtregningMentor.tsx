import {
    Buildings2Icon,
    EqualsIcon,
    MinusIcon,
    ParasolBeachIcon,
    PiggybankIcon,
    PlusIcon,
    SackKronerIcon,
} from '@navikt/aksel-icons';

import { ExpansionCard, Heading } from '@navikt/ds-react';
import { FunctionComponent, useState } from 'react';

import { formatterPenger, visTallMedNorskFormatering } from '~/utils/PengeUtils';

import Utregningsrad from './Utregningsrad';

import { Beregning, Tilskuddsgrunnlag } from '~/types/refusjon';
import { erNil } from '~/utils/predicates';

interface Props {
    beregning?: Beregning;
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
}

const UtregningMentor: FunctionComponent<Props> = (props) => {
    const [ekspandert, setEkspandert] = useState(true);

    const { beregning, tilskuddsgrunnlag } = props;
    const { mentorAntallTimer = 0, mentorTimelonn = 0 } = tilskuddsgrunnlag;

    if (erNil(beregning)) {
        return;
    }

    const reduksjonForDelvisPeriode = beregning ? beregning.sumUtgifter - beregning.refusjonsbeløp : 0;

    return (
        <ExpansionCard aria-label="Beregning av tilskudd" open={ekspandert} onToggle={setEkspandert} size="small">
            <ExpansionCard.Header>
                <Heading level="3" size="medium">
                    Beregning av tilskudd
                </Heading>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Utregningsrad
                    labelIkon={<SackKronerIcon />}
                    labelTekst={'Timelønn × antall timer'}
                    labelSubtekst={`(${formatterPenger(mentorTimelonn)} × ${visTallMedNorskFormatering(mentorAntallTimer)})`}
                    verdi={beregning?.lønn || 0}
                />
                <Utregningsrad
                    labelIkon={<ParasolBeachIcon />}
                    labelTekst="Feriepenger"
                    labelSats={tilskuddsgrunnlag.feriepengerSats}
                    verdiOperator={(beregning?.feriepenger || 0) >= 0 ? <PlusIcon /> : <MinusIcon />}
                    verdi={Math.abs(beregning?.feriepenger || 0)}
                />
                <Utregningsrad
                    labelIkon={<PiggybankIcon />}
                    labelTekst="Obligatorisk tjenestepensjon"
                    labelSats={tilskuddsgrunnlag.otpSats}
                    verdiOperator={(beregning?.tjenestepensjon || 0) >= 0 ? <PlusIcon /> : <MinusIcon />}
                    verdi={Math.abs(beregning?.tjenestepensjon || 0)}
                />
                <Utregningsrad
                    labelIkon={<Buildings2Icon />}
                    labelTekst="Arbeidsgiveravgift"
                    labelSats={tilskuddsgrunnlag.arbeidsgiveravgiftSats}
                    verdiOperator={(beregning?.arbeidsgiveravgift || 0) >= 0 ? <PlusIcon /> : <MinusIcon />}
                    verdi={Math.abs(beregning?.arbeidsgiveravgift || 0)}
                    border={beregning && beregning?.tidligereRefundertBeløp > 0 ? 'TYKK' : undefined}
                />
                <Utregningsrad
                    labelTekst={<b>Sum tilskudd for en måned</b>}
                    verdi={beregning?.sumUtgifter || 0}
                    border={beregning && beregning?.tidligereRefundertBeløp > 0 ? 'TYKK' : undefined}
                />
                {reduksjonForDelvisPeriode > 0 && (
                    <Utregningsrad
                        labelTekst={<b>Reduksjon for delvis periode</b>}
                        verdiOperator={<MinusIcon />}
                        verdi={reduksjonForDelvisPeriode}
                        border={beregning && beregning?.tidligereRefundertBeløp > 0 ? 'TYKK' : undefined}
                    />
                )}
                <Utregningsrad
                    labelTekst={<b>Til utbetaling</b>}
                    verdiOperator={<EqualsIcon />}
                    verdi={(beregning?.refusjonsbeløp || 0) ?? 'kan ikke beregne'}
                    ikkePenger={beregning === undefined}
                />
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default UtregningMentor;
