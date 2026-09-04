import { useEffect, useState } from 'react';
import { awaitDecoratorData } from '@navikt/nav-dekoratoren-moduler';

import {
    createBeforeSendHandler,
    getAnalyticsConsent,
    getSporingScriptSrc,
    getWebsiteId,
    SPORING_SCRIPT_ID,
    updateConsentDisabledFlag,
} from './sporing';

function InnblikkSporing() {
    const [analyticsConsent, setAnalyticsConsent] = useState<boolean | null>(null);

    useEffect(() => {
        let aktiv = true;

        const oppdaterSamtykke = () => {
            if (!aktiv) {
                return;
            }

            setAnalyticsConsent(getAnalyticsConsent());
        };

        void (async () => {
            try {
                await awaitDecoratorData();
                oppdaterSamtykke();
            } catch (error) {
                console.error('Kunne ikke hente dekoratør-data for Innblikk-sporing', error);
            }
        })();

        window.addEventListener('consentAllWebStorage', oppdaterSamtykke);
        window.addEventListener('refuseOptionalWebStorage', oppdaterSamtykke);

        return () => {
            aktiv = false;
            window.removeEventListener('consentAllWebStorage', oppdaterSamtykke);
            window.removeEventListener('refuseOptionalWebStorage', oppdaterSamtykke);
        };
    }, []);

    useEffect(() => {
        if (analyticsConsent === null) {
            return;
        }

        updateConsentDisabledFlag(analyticsConsent);

        const existingScript = document.getElementById(SPORING_SCRIPT_ID);

        if (!analyticsConsent) {
            existingScript?.remove();
            return;
        }

        if (existingScript) {
            return;
        }

        const hostname = window.location.hostname;
        const script = document.createElement('script');
        script.id = SPORING_SCRIPT_ID;
        script.defer = true;
        script.src = getSporingScriptSrc(hostname);
        script.setAttribute('data-website-id', getWebsiteId(hostname));
        script.setAttribute('data-tag', 'tiltak-refusjon');
        script.setAttribute('data-before-send', 'beforeSendAnalytics');
        script.setAttribute('data-exclude-search', 'true');

        if (!window.beforeSendAnalytics) {
            window.beforeSendAnalytics = createBeforeSendHandler();
        }

        document.head.appendChild(script);
    }, [analyticsConsent]);

    return null;
}

export default InnblikkSporing;
