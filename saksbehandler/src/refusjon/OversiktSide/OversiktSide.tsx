import React, { FunctionComponent, Suspense } from 'react';

import BEMHelper from '~/utils/bem';
import Banner from '@/refusjon/oversikt/Banner';
import Filtermeny from '@/refusjon/oversikt/Filtermeny';
import IkkeTilgang403ErrorBoundary from '~/IkkeTilgang403ErrorBoundary';
import Oversikt from '@/refusjon/oversikt/Oversikt';
import OversiktSkeleton from '@/komponenter/OversiktSkeleton/OversiktSkeleton';
import { BrukerContextType } from '~/types/brukerContextType';
import { useFilter } from '@/refusjon/oversikt/FilterContext';
import { useInnloggetBruker } from '@/bruker/BrukerContext';

import './OversiktSide.less';
import { Path } from '@/router/Router';

const cls = BEMHelper('OversiktSide');

const OversiktSide: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();
    const brukerContext: BrukerContextType = useInnloggetBruker();

    const options = {
        erArbeidsgiver: false,
        harKorreksjonTilgang: brukerContext.innloggetBruker.harKorreksjonTilgang ?? false,
    };

    return (
        <div className={cls.className}>
            <div className={cls.element('banner')}>
                <Banner />
            </div>
            <div className={cls.element('oversikt')}>
                <div className={cls.element('wrapper')}>
                    <div className={cls.element('meny')}>
                        <Filtermeny filter={filter} oppdaterFilter={oppdaterFilter} options={options} />
                    </div>
                    <div className={cls.element('container')}>
                        <IkkeTilgang403ErrorBoundary filter={filter} pathTilForside={Path.OVERSIKT}>
                            <Suspense fallback={<OversiktSkeleton />}>
                                <Oversikt />
                            </Suspense>
                        </IkkeTilgang403ErrorBoundary>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OversiktSide;
