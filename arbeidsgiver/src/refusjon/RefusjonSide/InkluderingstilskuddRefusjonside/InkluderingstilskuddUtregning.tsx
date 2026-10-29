import { BankNoteIcon, ReceiptIcon, XMarkOctagonIcon } from '@navikt/aksel-icons';
import { BodyShort, Box, ExpansionCard, ReadMore } from '@navikt/ds-react';

import Utregningsrad from '@/komponenter/Utregningsrad';
import ErlikTegn from '@/asset/image/erlikTegn.svg?react';
import MinusTegn from '@/asset/image/minusTegn.svg?react';

import { Utgiftsberegning } from './utgifter';

interface Props {
    beregning: Utgiftsberegning;
}

const InkluderingstilskuddUtregning = ({ beregning }: Props) => {
    const { sumUtgifter, fratrekkOverstigendeBeløp, refusjonsbeløp } = beregning;

    return (
        <ExpansionCard aria-labelledby="inkluderingstilskudd-utregning-tittel" defaultOpen>
            <ExpansionCard.Header>
                <ExpansionCard.Title as="h2" id="inkluderingstilskudd-utregning-tittel">
                    Utregningen
                </ExpansionCard.Title>
            </ExpansionCard.Header>
            <ExpansionCard.Content>
                <Box overflowX="auto">
                    <Utregningsrad
                        labelIkon={<ReceiptIcon aria-hidden />}
                        labelTekst="Utgifter i perioden"
                        verdi={sumUtgifter}
                    />
                    {fratrekkOverstigendeBeløp > 0 && (
                        <Utregningsrad
                            labelIkon={<XMarkOctagonIcon aria-hidden />}
                            labelTekst="Fratrekk for overstigende beløp"
                            verdiOperator={<MinusTegn />}
                            verdi={fratrekkOverstigendeBeløp}
                        >
                            <ReadMore size="small" header="Hva betyr dette?" defaultOpen>
                                <BodyShort size="small">
                                    Én eller flere av utgiftene overstiger avtalt beløp. Det avtalte beløpet utbetales.
                                </BodyShort>
                            </ReadMore>
                        </Utregningsrad>
                    )}
                    <Utregningsrad
                        labelIkon={<BankNoteIcon aria-hidden />}
                        labelTekst="Refusjonsbeløp til utbetaling"
                        verdiOperator={<ErlikTegn />}
                        verdi={refusjonsbeløp}
                        border="TYKK"
                    />
                </Box>
            </ExpansionCard.Content>
        </ExpansionCard>
    );
};

export default InkluderingstilskuddUtregning;
