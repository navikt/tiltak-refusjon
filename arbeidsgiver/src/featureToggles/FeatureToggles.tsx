import React, { FunctionComponent, PropsWithChildren, useContext } from 'react';

import { useFeatureToggles } from '@/services/rest-service';

export enum Feature {
    arbeidsgiverNyRefusjon = 'arbeidsgiverNyRefusjon',
}

export type FeatureToggles = Record<Feature, boolean>;

const defaultFeatureToggles: FeatureToggles = {
    [Feature.arbeidsgiverNyRefusjon]: false,
};

export const FeatureToggleContext = React.createContext<FeatureToggles | undefined>(undefined);

export const useFeatureToggle = (): FeatureToggles => {
    const context = useContext(FeatureToggleContext);
    if (context === undefined) {
        throw new Error('Kan kun brukes innenfor FeatureToggleProvider');
    }
    return context;
};

export const FeatureTogglesProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
    const { data, error } = useFeatureToggles();
    const featureToggles = error || data === undefined ? defaultFeatureToggles : data;

    return <FeatureToggleContext.Provider value={featureToggles}>{children}</FeatureToggleContext.Provider>;
};
