import { useEffect } from 'react';
import { preInnsending } from '~/sporing/preInnsending';
import { SPORING_SCRIPT_ID } from '~/sporing/config';
import { settOppSporingsskript } from '~/sporing/script';
import { hentSidetype } from './sporing';
import { useSporingAktiv } from './sporingsvalg';

function InnblikkSporing() {
    const sporingAktiv = useSporingAktiv();

    useEffect(() => {
        const eksisterendeSkript = document.getElementById(SPORING_SCRIPT_ID);

        if (!sporingAktiv) {
            eksisterendeSkript?.remove();
            return;
        }

        if (eksisterendeSkript) {
            return;
        }

        if (!window.beforeSendAnalytics) {
            window.beforeSendAnalytics = preInnsending(hentSidetype);
        }

        const script = settOppSporingsskript(window.location.hostname);
        document.head.appendChild(script);
    }, [sporingAktiv]);

    return null;
}

export default InnblikkSporing;
