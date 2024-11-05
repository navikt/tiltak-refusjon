import React, { FunctionComponent, Suspense } from 'react';
import OversiktSkeleton from '../../komponenter/OversiktSkeleton/OversiktSkeleton';
import Filtermeny from '../oversikt/Filtermeny';
import Oversikt from '../oversikt/Oversikt';
import './OversiktSide.less';
import Banner from '../oversikt/Banner';
import BannerLaster from '../oversikt/BannerLaster';
import BEMHelper from '~/utils/bem';

import { useInnloggetBruker } from '@/bruker/BrukerContext';
import { useFilter } from '../oversikt/FilterContext';
import { useFeatureToggles } from '../../featureToggles/FeatureToggleProvider';
import { Feature } from '@/featureToggles/features';
import { BrukerContextType } from '~/types/BrukerContextType';

const cls = BEMHelper('OversiktSide');

const OversiktSide: FunctionComponent = () => {
    const { filter, oppdaterFilter } = useFilter();
    const featureToggles = useFeatureToggles();
    const brukerContext: BrukerContextType = useInnloggetBruker();

    const options = {
        erArbeidsgiver: false,
        harKorreksjonTilgang: brukerContext.innloggetBruker.harKorreksjonTilgang,
        skjulVTAO: !featureToggles[Feature.VtaoToggle],
    };

    return (
        <div className={cls.className}>
            <div className={cls.element('banner')}>
                <Suspense fallback={<BannerLaster />}>
                    <Banner />
                </Suspense>
            </div>
            <div className={cls.element('oversikt')}>
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
        </div>
    );
};

export default OversiktSide;
