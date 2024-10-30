import React, { FunctionComponent, Suspense } from 'react';
import OversiktSkeleton from '../../komponenter/OversiktSkeleton/OversiktSkeleton';
import Oversikt from '../oversikt/Oversikt';
import './OversiktSide.less';
import BEMHelper from '~/utils/bem';
const cls = BEMHelper('OversiktSide');
import Filtermeny from '~/Filtermeny/Filtermeny';
import { useFilter } from '../oversikt/FilterContext';

const OversiktSide: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();
    const options = {
        erArbeidsgiver: true,
        harKorreksjonTilgang: false,
        featureToggleVTAO: true,
    };

    return (
        <div role="main" className={cls.className}>
            <div className={cls.element('wrapper')}>
                <div className={cls.element('meny')}>
                    <Filtermeny filter={filter} oppdaterFilter={oppdaterFilter} options={options} />
                </div>
                <div className={cls.element('container')}>
                    <Suspense fallback={<OversiktSkeleton />}>
                        <Oversikt />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};

export default OversiktSide;
