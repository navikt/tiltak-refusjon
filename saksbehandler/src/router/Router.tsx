import { createBrowserRouter, Outlet } from 'react-router';

import AdvarselBannerTestversjon from '@/AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import ErrorBoundary from '@/ErrorBoundary';
import InternflateDekoratør from '@/InternflateDekoratør';
import Korreksjon from '@/KorreksjonSide/Korreksjon';
import OversiktRouteError from './OversiktRouteError';
import OversiktSide from '@/refusjon/OversiktSide/OversiktSide';
import Refusjon from '@/refusjon/RefusjonSide/Refusjon';
import ScrollToTop from '@/komponenter/ScrollToTop';
import { BrukerProvider } from '@/bruker/BrukerContext';
import { FeatureToggleProvider } from '@/featureToggles/FeatureToggleProvider';
import { FilterProvider } from '@/refusjon/oversikt/FilterContext';
import IkkeFunnet404 from '~/IkkeFunnet404';

export const basename = '/';

export enum Path {
    OVERSIKT = '/',
    REFUSJON = '/refusjon/:refusjonId',
    KORREKSJON = '/korreksjon/:korreksjonId',
}

const router = createBrowserRouter(
    [
        {
            path: Path.OVERSIKT,
            element: (
                <ErrorBoundary>
                    <ScrollToTop />
                    <AdvarselBannerTestversjon />
                    <InternflateDekoratør />
                    <Outlet />
                </ErrorBoundary>
            ),
            children: [
                {
                    path: '/*',
                    element: <IkkeFunnet404 pathTilForside={Path.OVERSIKT} />,
                },
                {
                    path: Path.OVERSIKT,
                    element: (
                        <BrukerProvider>
                            <FeatureToggleProvider>
                                <FilterProvider>
                                    <Outlet />
                                </FilterProvider>
                            </FeatureToggleProvider>
                        </BrukerProvider>
                    ),
                    errorElement: <OversiktRouteError />,
                    children: [
                        {
                            path: Path.OVERSIKT,
                            element: <OversiktSide />,
                        },
                        {
                            path: Path.REFUSJON,
                            element: <Refusjon />,
                        },
                        {
                            path: Path.KORREKSJON,
                            element: <Korreksjon />,
                        },
                    ],
                },
            ],
        },
    ],
    { basename }
);

export default router;
