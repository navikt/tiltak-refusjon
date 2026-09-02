import { useEffect } from 'react';
import { preInnsending } from '~/sporing/preInnsending';
import { SPORING_SCRIPT_ID } from '~/sporing/config';
import { settOppSporingsskript } from '~/sporing/script';
import { aktiverSporing } from '~/sporing/localStorage';
import { hentSidetype } from './sporing';

function InnblikkSporing() {
    useEffect(() => {
        aktiverSporing();

        if (document.getElementById(SPORING_SCRIPT_ID)) {
            return;
        }

        if (!window.beforeSendAnalytics) {
            window.beforeSendAnalytics = preInnsending(hentSidetype);
        }

        const script = settOppSporingsskript(window.location.hostname);
        document.head.appendChild(script);
    }, []);

    return null;
}

export default InnblikkSporing;
