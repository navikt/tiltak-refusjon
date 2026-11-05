import React, { FunctionComponent, PropsWithChildren, useContext } from 'react';

import { useFeatureToggles } from '@/services/rest-service';

export enum Feature {
    arbeidsgiverNyRefusjon = 'arbeidsgiverNyRefusjon',
    inkluderingstilskuddRefusjon = 'inkluderingstilskuddRefusjon',
}

export type FeatureToggles = Record<Feature, boolean>;

const defaultFeatureToggles: FeatureToggles = {
    [Feature.arbeidsgiverNyRefusjon]: false,
    [Feature.inkluderingstilskuddRefusjon]: false,
};

type FeatureToggleContextType = FeatureToggles & { laster: boolean };

export const FeatureToggleContext = React.createContext<FeatureToggleContextType | undefined>(undefined);

export const useFeatureToggle = (): FeatureToggleContextType => {
    const context = useContext(FeatureToggleContext);
    if (context === undefined) {
        throw new Error('Kan kun brukes innenfor FeatureToggleProvider');
    }
    return context;
};

export const FeatureTogglesProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const { data, error, isLoading } = useFeatureToggles();
    const featureToggles = error || data === undefined ? defaultFeatureToggles : data;

    return (
        <FeatureToggleContext.Provider value={{ ...featureToggles, laster: isLoading }}>
            {children}
        </FeatureToggleContext.Provider>
    );
};
