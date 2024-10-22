import React, { FunctionComponent } from 'react';

import { Heading } from '@navikt/ds-react';
import InfoIkon from '@/asset/image/info.svg?react';
import './finnerIngenRefusjoner.less';
import BEMHelper from '~/utils/bem';

const cls = BEMHelper('finnerIngenRefusjoner');

const FinnerIngenRefusjoner: FunctionComponent = () => {
    return (
        <div className={cls.className}>
            <Heading size="small" role="heading" className={cls.element('tittel')}>
                <InfoIkon className={cls.element('ikon')} width={48} />
                Finner ingen refusjoner
            </Heading>
        </div>
    );
};

export default FinnerIngenRefusjoner;
