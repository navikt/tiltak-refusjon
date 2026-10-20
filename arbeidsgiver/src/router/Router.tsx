import { createBrowserRouter, Outlet } from 'react-router';
import { Suspense } from 'react';

import AdvarselBannerTestversjon from '@/AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import AMeldingBanner from '@/AMeldingBanner/AMeldingBanner';
import ErrorBoundary from '@/ErrorBoundary';
import IkkeFunnet404 from '~/IkkeFunnet404';
import OversiktRouteError from './OversiktRouteError';
import OversiktSide from '@/refusjon/OversiktSide/OversiktSide';
import Refusjon from '@/refusjon/RefusjonSide/Refusjon';
import ScrollToTop from '@/komponenter/ScrollToTop';
import { BrukerProvider } from '@/bruker/BrukerContext';
import { FeatureTogglesProvider } from '@/featureToggles';
import { FilterProvider } from '@/refusjon/oversikt/FilterContext';
import RefusjonKontroll from '@/komponenter/refusjon-kontroll/RefusjonKontroll';
import LasterBoks from '~/LasterBoks';
import { InnholdProvider } from '~/Container';
import Landingsside from '@/Landingsside';

export const basename = '/';

export enum Path {
    LANDINGSSIDE = '/',
    REFUSJON_OVERSIKT = '/refusjon',
    REFUSJON = '/refusjon/:refusjonId/*',
}

const router = createBrowserRouter(
    [
        {
            path: Path.LANDINGSSIDE,
            element: (
                <ErrorBoundary>
                    <ScrollToTop />
                    <AdvarselBannerTestversjon />
                    <InnholdProvider>
                        <Outlet />
                    </InnholdProvider>
                </ErrorBoundary>
            ),
            children: [
                {
                    path: '/*',
                    element: <IkkeFunnet404 pathTilForside={Path.REFUSJON_OVERSIKT} arbeidsgiver />,
                },
                {
                    path: Path.LANDINGSSIDE,
                    errorElement: <OversiktRouteError />,
                    children: [
                        {
                            path: Path.LANDINGSSIDE,
                            element: <Landingsside />,
                        },
                        {
                            path: Path.REFUSJON_OVERSIKT,
                            element: (
                                <Suspense fallback={<LasterBoks />}>
                                    <FeatureTogglesProvider>
                                        <BrukerProvider>
                                            <AMeldingBanner />
                                            <Outlet />
                                        </BrukerProvider>
                                    </FeatureTogglesProvider>
                                </Suspense>
                            ),
                            children: [
                                {
                                    path: Path.REFUSJON_OVERSIKT,
                                    element: (
                                        <FilterProvider>
                                            <OversiktSide />
                                        </FilterProvider>
                                    ),
                                },
                                {
                                    path: Path.REFUSJON,
                                    element: (
                                        <RefusjonKontroll>
                                            <Refusjon />
                                        </RefusjonKontroll>
                                    ),
                                },
                            ],
                        },
                    ],
                },
            ],
        },
    ],
    { basename }
);

export default router;
