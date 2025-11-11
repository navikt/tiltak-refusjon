import { Money } from '@navikt/ds-icons';
import { Label, BodyShort } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import VerticalSpacer from '~/VerticalSpacer';
import { formatterPenger } from '~/utils/PengeUtils';
import Boks from '~/Boks';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import { formatterPeriode } from '~/utils';

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
};

const SummeringBoksMentor: FunctionComponent<Props> = (props) => {
    return (
        <Boks variant="blå">
            <div style={{ margin: 'auto 1.5rem auto 0' }}>
                <Money />
            </div>
            <div>
                <Label>Dere får utbetalt</Label>
                <VerticalSpacer rem={0.5} />
                <BodyShort size="small">
                    <b>{formatterPenger(props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddsbeløp)}</b> for perioden{' '}
                    {formatterPeriode(
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                        props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                    )}{' '}
                    til kontonummer {props.refusjonsgrunnlag.bedriftKontonummer}
                </BodyShort>
            </div>
        </Boks>
    );
};

export default SummeringBoksMentor;
