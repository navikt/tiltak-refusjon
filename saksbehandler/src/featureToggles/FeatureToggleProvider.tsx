import React, { createContext, useContext, useEffect, useState } from 'react';
import { hentFeatureToggles } from '../services/rest-service';
import { Feature } from './features';

export const alleFeatures = Object.values(Feature);

export interface FeatureToggles {
    [toggles: string]: boolean;
}

const FeatureToggleContext = createContext<FeatureToggles>({});

export const FeatureToggleProvider = (props: any) => {
    const [featureToggles, setFeatureToggles] = useState<FeatureToggles>({});

    useEffect(() => {
        hentFeatureToggles(alleFeatures).then(setFeatureToggles);
    }, []);

    return <FeatureToggleContext.Provider value={featureToggles}>{props.children}</FeatureToggleContext.Provider>;
};

export const useFeatureToggles = () => {
    const featureToggleContext = useContext(FeatureToggleContext);
    if (!featureToggleContext) {
        throw Error('Kan kun brukes innenfor FeatureToggleProvider');
    }
    return featureToggleContext;
};
