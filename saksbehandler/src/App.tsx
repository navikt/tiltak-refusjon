import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdvarselBannerTestversjon from './AdvarselBannerTestversjon/AdvarselBannerTestversjon';
import './App.css';
import { BrukerProvider } from './bruker/BrukerContext';
import ScrollToTop from './komponenter/ScrollToTop';
import OversiktSide from './refusjon/OversiktSide/OversiktSide';
import Refusjon from './refusjon/RefusjonSide/Refusjon';
import InternflateDekoratør from './InternflateDekoratør';
import { FeatureToggleProvider } from './featureToggles/FeatureToggleProvider';
import { FilterProvider } from './refusjon/oversikt/FilterContext';
import Korreksjon from './KorreksjonSide/Korreksjon';
import ErrorBoundary from './ErrorBoundary';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AdvarselBannerTestversjon />
            <InternflateDekoratør />
            <BrukerProvider>
                <FeatureToggleProvider>
                    <FilterProvider>
                        <div style={{ minHeight: '10rem', padding: '0.5rem' }}>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <ErrorBoundary>
                                            <OversiktSide />
                                        </ErrorBoundary>
                                    }
                                ></Route>
                                <Route
                                    path="/refusjon/:refusjonId"
                                    element={
                                        <ErrorBoundary>
                                            <Refusjon />
                                        </ErrorBoundary>
                                    }
                                ></Route>
                                <Route
                                    path="/korreksjon/:korreksjonId"
                                    element={
                                        <ErrorBoundary>
                                            <Korreksjon />
                                        </ErrorBoundary>
                                    }
                                ></Route>
                            </Routes>
                        </div>
                    </FilterProvider>
                </FeatureToggleProvider>
            </BrukerProvider>
        </BrowserRouter>
    );
}

export default App;
