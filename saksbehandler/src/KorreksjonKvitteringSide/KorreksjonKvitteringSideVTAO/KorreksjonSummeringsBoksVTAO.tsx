import Pengesedler from '@/asset/image/pengesedler.svg?react';
import React, { FunctionComponent } from 'react';
import { BodyShort } from '@navikt/ds-react';
import { Tilskuddsgrunnlag } from '~/types/refusjon';
import { formatterPeriode } from '~/utils';
import VerticalSpacer from '~/VerticalSpacer';
import { formatterPenger } from '@/utils/PengeUtils';
import Boks from '~/Boks';

const KorreksjonSummeringBoks: FunctionComponent<{ tilskuddsgrunnlag: Tilskuddsgrunnlag }> = ({
    tilskuddsgrunnlag,
}) => {
    return (
        <Boks variant="blå">
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            <VerticalSpacer rem={0.5} />
            <BodyShort size="small">
                Dere skylder <b>{formatterPenger(Math.abs(tilskuddsgrunnlag.tilskuddsbeløp || 0))}</b> for perioden{' '}
                {formatterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)} Beløpet vil
                tilbakekreves.
            </BodyShort>
        </Boks>
    );
};

export default KorreksjonSummeringBoks;
