import { useEffect, useState } from 'react';
import { awaitDecoratorData } from '@navikt/nav-dekoratoren-moduler';
import { preInnsending } from '~/sporing/preInnsending';
import { SPORING_SCRIPT_ID } from '~/sporing/config';
import { settOppSporingsskript } from '~/sporing/script';
import { aktiverSporing, deaktiverSporing } from '~/sporing/localStorage';
import { hentGjeldendeSamtykke, hentSidetype } from './sporing';

function InnblikkSporing() {
    const [harGittSamtykke, setHarGittSamtykke] = useState<boolean>(false);

    useEffect(() => {
        let aktiv = true;

        const oppdaterSamtykke = () => {
            if (!aktiv) {
                return;
            }

            setHarGittSamtykke(hentGjeldendeSamtykke().consent.analytics);
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
        const eksisterendeSkript = document.getElementById(SPORING_SCRIPT_ID);

        if (!harGittSamtykke) {
            deaktiverSporing();
            eksisterendeSkript?.remove();
            return;
        }

        aktiverSporing();

        if (eksisterendeSkript) {
            return;
        }

        if (!window.beforeSendAnalytics) {
            window.beforeSendAnalytics = preInnsending(hentSidetype);
        }

        const script = settOppSporingsskript(window.location.hostname);
        document.head.appendChild(script);
    }, [harGittSamtykke]);

    useEffect(() => {
        return () => {
            const skript = document.getElementById(SPORING_SCRIPT_ID);
            skript?.remove();
            delete window.beforeSendAnalytics;
        };
    }, []);

    return null;
}

export default InnblikkSporing;
