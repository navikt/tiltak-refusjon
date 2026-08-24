import { useEffect } from 'react';
import { preInnsending } from '~/sporing/preInnsending';
import { lastInnSporingsskript } from '~/sporing/script';
import { hentSidetype } from './sporing';
import { useSporingAktiv } from './sporingsvalg';

function InnblikkSporing() {
    const sporingAktiv = useSporingAktiv();

    useEffect(() => {
        if (sporingAktiv) {
            lastInnSporingsskript(window.location.hostname, preInnsending(hentSidetype, 'saksbehandler'));
        }
    }, [sporingAktiv]);

    return null;
}

export default InnblikkSporing;
