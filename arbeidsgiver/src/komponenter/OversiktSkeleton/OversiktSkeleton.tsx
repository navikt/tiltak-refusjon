import React from 'react';
import Skeleton from 'react-loading-skeleton';
import BEMHelper from '../../utils/bem';
import ArbeidsgiverTableHeader from '~/OversiktTabell/TableHeader/ArbeidsgiverTableHeader';
import OversiktTabell from '~/OversiktTabell/OversiktTabell';

const cls = BEMHelper('oversikt');

export default function OversiktSkeleton() {
    return (
        <div className={cls.className}>
            <OversiktTabell tableHeader={ArbeidsgiverTableHeader} tableBody={<Skeleton count={3} className={cls.element('rad')} />} />
        </div>
    );
}
