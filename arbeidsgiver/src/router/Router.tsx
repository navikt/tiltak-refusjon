import * as React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import AdvarselBannerTestversjon from '@/AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import ErrorOgSuspenseHandlerMain from '@/ErrorOgSuspenseHandlerMain';
import IkkeFunnet404 from '~/IkkeFunnet404';
import OversiktRouteError from './OversiktRouteError';
import OversiktSide from '@/refusjon/OversiktSide/OversiktSide';
import Refusjon from '@/refusjon/RefusjonSide/Refusjon';
import ScrollToTop from '@/komponenter/ScrollToTop';
import SuspenseHandler from '@/SuspenseHandler';
import { BrukerProvider } from '@/bruker/BrukerContext';
import { FilterProvider } from '@/refusjon/oversikt/FilterContext';
import RefusjonKontroll from '@/komponenter/refusjon-kontroll/RefusjonKontroll';

import styles from './Router.module.less';
import Landingsside from '@/Landingsside';

export const basename = '/';

export enum Path {
    LANDINGSSIDE = '/',
    REFUSJON_OVERSIKT = '/refusjon',
    REFUSJON = '/refusjon/:refusjonId',
}

const router = createBrowserRouter(
    [
        {
            path: Path.LANDINGSSIDE,
            element: (
                <ErrorOgSuspenseHandlerMain>
                    <ScrollToTop />
                    <AdvarselBannerTestversjon />
                    <Outlet />
                </ErrorOgSuspenseHandlerMain>
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
                                <SuspenseHandler>
                                    <BrukerProvider>
                                        <div className={styles.wrapper}>
                                            <Outlet />
                                        </div>
                                    </BrukerProvider>
                                </SuspenseHandler>
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
