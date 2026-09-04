import { useSyncExternalStore } from 'react';
import { aktiverSporing, deaktiverSporing, erSporingDeaktivert } from '~/sporing/localStorage';

export const SPORINGSVALG_ENDRET = 'sporingsvalg-endret';

type Lytter = () => void;

function abonner(lytter: Lytter): () => void {
    window.addEventListener(SPORINGSVALG_ENDRET, lytter);
    window.addEventListener('storage', lytter);

    return () => {
        window.removeEventListener(SPORINGSVALG_ENDRET, lytter);
        window.removeEventListener('storage', lytter);
    };
}

function hentTilstand(): boolean {
    return !erSporingDeaktivert();
}

export function settSporingsvalg(aktiv: boolean): void {
    if (aktiv) {
        aktiverSporing();
    } else {
        deaktiverSporing();
    }

    window.dispatchEvent(new Event(SPORINGSVALG_ENDRET));
}

export function useSporingAktiv(): boolean {
    return useSyncExternalStore(abonner, hentTilstand, () => true);
}
