import { lagFeatureToggleContext } from '~/featureToggles/lagFeatureToggleContext';
import { useHentFeatureToggles } from '@/services/rest-service';

export const { FeatureToggleProvider, useFeatureToggles } = lagFeatureToggleContext(useHentFeatureToggles);
