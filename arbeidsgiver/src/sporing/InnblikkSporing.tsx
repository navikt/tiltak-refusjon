import { useEffect, useState } from 'react';
import { awaitDecoratorData } from '@navikt/nav-dekoratoren-moduler';
import { preInnsending } from '~/sporing/preInnsending';
import { lastInnSporingsskript } from '~/sporing/script';
import { aktiverSporing, deaktiverSporing } from '~/sporing/localStorage';
import { hentGjeldendeSamtykke, hentSidetype } from './sporing';

function InnblikkSporing() {
    // null betyr at samtykket ikke er kjent ennå
    const [harGittSamtykke, setHarGittSamtykke] = useState<boolean | null>(null);

    useEffect(() => {
        let aktiv = true;

        const gaSamtykke = () => setHarGittSamtykke(true);
        const avslaSamtykke = () => setHarGittSamtykke(false);

        void (async () => {
            try {
                await awaitDecoratorData();
                if (aktiv) {
                    const samtykke = hentGjeldendeSamtykke().consent.analytics;
                    setHarGittSamtykke((forrige) => forrige ?? samtykke);
                }
            } catch (error) {
                console.error('Kunne ikke hente dekoratør-data for Innblikk-sporing', error);
            }
        })();

        window.addEventListener('consentAllWebStorage', gaSamtykke);
        window.addEventListener('refuseOptionalWebStorage', avslaSamtykke);

        return () => {
            aktiv = false;
            window.removeEventListener('consentAllWebStorage', gaSamtykke);
            window.removeEventListener('refuseOptionalWebStorage', avslaSamtykke);
        };
    }, []);

    useEffect(() => {
        if (harGittSamtykke === null) {
            return;
        }

        if (!harGittSamtykke) {
            deaktiverSporing();
            return;
        }

        aktiverSporing();
        lastInnSporingsskript(window.location.hostname, preInnsending(hentSidetype, 'arbeidsgiver'));
    }, [harGittSamtykke]);

    return null;
}

export default InnblikkSporing;
