import React, { FunctionComponent } from 'react';
import { Heading, TextField } from '@navikt/ds-react';
import BEMHelper from '~/utils/bem';
import { Refusjon, Tilskuddsgrunnlag } from '~/types/refusjon';
import { formatterPeriode } from '~/utils';
import VerticalSpacer from '~/VerticalSpacer';
import Boks from '~/Boks';
import { formatterPenger } from '~/utils/PengeUtils';

interface Props {
    tilskuddsgrunnlag: Tilskuddsgrunnlag;
}

const TilskuddssatsVTAO: FunctionComponent<Props> = ({ tilskuddsgrunnlag }) => {
    const cls = BEMHelper('refusjonside');

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
