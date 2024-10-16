import React, { FunctionComponent } from 'react';

import { Heading } from '@navikt/ds-react';
import InfoIkon from '@/asset/image/info.svg?react';
import './finnerIngenRefusjoner.less';
import BEMHelper from '~/utils/bem';

interface Props {
    orgnr: string;
}

const FinnerIngenRefusjoner: FunctionComponent<Props> = (props) => {
    const { orgnr } = props;
    const cls = BEMHelper('finnerIngenRefusjoner');

    return (
        <div className={cls.className}>
            <Heading size="small" role="heading" className={cls.element('tittel')}>
                <InfoIkon className={cls.element('ikon')} width={48} />
                Finner ingen refusjoner på organisasjonsnummer: {orgnr}
            </Heading>
        </div>
    );
};

export default FinnerIngenRefusjoner;
