import React from 'react';
import Skeleton from 'react-loading-skeleton';

import SaksbehandlerTableHeader from '~/OversiktTabell/TableHeader/SaksbehandlerTableHeader';
import OversiktTabell from '~/OversiktTabell/OversiktTabell';
import BEMHelper from '~/utils/bem';

const cls = BEMHelper('oversikt');

export default function OversiktSkeleton() {
    return (
        <div className={cls.className}>
            <OversiktTabell tableHeader={<SaksbehandlerTableHeader/>} tableBody={<Skeleton count={3} className={cls.element('rad')} />} />
        </div>
    );
}
