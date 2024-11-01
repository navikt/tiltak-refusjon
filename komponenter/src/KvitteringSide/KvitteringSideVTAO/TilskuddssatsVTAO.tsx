import React, { FunctionComponent } from 'react';
import { Heading, TextField } from '@navikt/ds-react';
import BEMHelper from '~/utils/bem';
import { Refusjon } from '~/types/refusjon';
import { formatterPeriode } from '~/utils';
import VerticalSpacer from '~/VerticalSpacer';
import Boks from '~/Boks';
import { formatterPenger } from '~/utils/PengeUtils';

interface Props {
    refusjon: Refusjon;
}

const TilskuddssatsVTAO: FunctionComponent<Props> = ({ refusjon }) => {
    const cls = BEMHelper('refusjonside');
    const { tilskuddsgrunnlag } = refusjon.refusjonsgrunnlag;

    return (
        <Boks variant="grønn">
            <Heading level="3" size="small">
                Refusjon for {formatterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)}
            </Heading>
            <VerticalSpacer rem={1} />
            <TextField
                style={{ width: '40%' }}
                label="Månedlig tilskuddssats"
                description="Sats for 2024"
                value={formatterPenger(tilskuddsgrunnlag.tilskuddsbeløp)}
                readOnly
            />
        </Boks>
    );
};

export default TilskuddssatsVTAO;
