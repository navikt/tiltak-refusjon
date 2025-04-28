import { Label } from '@navikt/ds-react';
import { FunctionComponent } from 'react';

import Pengesedler from '@/asset/image/pengesedler.svg?react';
import { Refusjonsgrunnlag } from '~/types/refusjon';
import { formatterPenger } from '@/utils/PengeUtils';
import { formatterPeriode } from '~/utils';

import styles from './SummeringBoksNullbeløp.module.less';

type Props = {
    refusjonsgrunnlag: Refusjonsgrunnlag;
};

const SummeringBoksNullbeløp: FunctionComponent<Props> = (props) => {
    return (
        <div className={styles.boks}>
            <div style={{ paddingRight: '1.5rem' }}>
                <Pengesedler />
            </div>
            <Label>
                Refusjonen er godtatt med {formatterPenger(0)} for perioden{' '}
                {formatterPeriode(
                    props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddFom,
                    props.refusjonsgrunnlag.tilskuddsgrunnlag.tilskuddTom
                )}
            </Label>
        </div>
    );
};

export default SummeringBoksNullbeløp;
