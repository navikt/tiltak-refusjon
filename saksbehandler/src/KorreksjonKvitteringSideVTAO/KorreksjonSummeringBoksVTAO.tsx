import Pengesedler from '@/asset/image/pengesedler.svg?react';
import { FunctionComponent } from 'react';
import { BodyShort } from '@navikt/ds-react';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import { formatterPeriode } from '~/utils';
import VerticalSpacer from '~/VerticalSpacer';
import { formatterPenger } from '@/utils/PengeUtils';
import Boks from '~/Boks';

const KorreksjonSummeringBoksVTAO: FunctionComponent<{
    refusjonsgrunnlag: Refusjonsgrunnlag;
}> = ({ refusjonsgrunnlag }) => {
    const { tilskuddsgrunnlag, beregning } = refusjonsgrunnlag;
    return (
        <Boks variant="blå">
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            <VerticalSpacer rem={0.5} />
            <BodyShort size="small">
                Dere skylder <b>{formatterPenger(Math.abs(beregning?.refusjonsbeløp || 0))}</b> for perioden{' '}
                {formatterPeriode(tilskuddsgrunnlag.tilskuddFom, tilskuddsgrunnlag.tilskuddTom)} Beløpet vil
                tilbakekreves.
            </BodyShort>
        </Boks>
    );
};

export default KorreksjonSummeringBoksVTAO;
