import React, { createContext, PropsWithChildren, useContext } from 'react';

import { defaultFeatureToggles, FeatureToggles } from './features';

type FeatureToggleRespons = {
    data?: Partial<FeatureToggles>;
    error?: unknown;
    isLoading: boolean;
};

export type FeatureToggleContextType = FeatureToggles & { laster: boolean };

export const featureToggleContext = (useHentFeatureToggles: () => FeatureToggleRespons) => {
    const FeatureToggleContext = createContext<FeatureToggleContextType | undefined>(undefined);

    const FeatureToggleProvider = ({ children }: PropsWithChildren) => {
        const { data, error, isLoading } = useHentFeatureToggles();
        const featureToggles = error || !data ? defaultFeatureToggles : { ...defaultFeatureToggles, ...data };

        return (
            <FeatureToggleContext.Provider value={{ ...featureToggles, laster: isLoading }}>
                {children}
            </FeatureToggleContext.Provider>
        );
    };

    const useFeatureToggles = (): FeatureToggleContextType => {
        const context = useContext(FeatureToggleContext);
        if (context === undefined) {
            throw new Error('Kan kun brukes innenfor FeatureToggleProvider');
        }
        return context;
    };

    return { FeatureToggleProvider, useFeatureToggles };
};
