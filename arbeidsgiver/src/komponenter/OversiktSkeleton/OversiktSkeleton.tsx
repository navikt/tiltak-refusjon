import { useFilter } from '@/refusjon/oversikt/FilterContext';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import OversiktTabell from '~/OversiktTabell';
import ArbeidsgiverTableHeader from '~/OversiktTabell/TableHeader/ArbeidsgiverTableHeader';

import BEMHelper from '~/utils/bem';

const cls = BEMHelper('oversikt');

export default function OversiktSkeleton() {
    const { filter, oppdaterFilter } = useFilter();
    return (
        <div className={cls.className}>
            <OversiktTabell
                tableHeader={<ArbeidsgiverTableHeader filter={filter} oppdaterFilter={oppdaterFilter} />}
                tableBody={<Skeleton count={3} className={cls.element('rad')} />}
            />
        </div>
    );
}
