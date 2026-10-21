import { hentNettstedId, hentSporingsSkriptUrl, SPORING_SCRIPT_ID } from './config';
import { BeforeSendHandler } from './preInnsending';

export function lastInnSporingsskript(hostname: string, beforeSend: BeforeSendHandler): void {
    window.beforeSendAnalytics ??= beforeSend;

    if (document.getElementById(SPORING_SCRIPT_ID)) {
        return;
    }

    document.head.appendChild(settOppSporingsskript(hostname));
}

export function settOppSporingsskript(hostname: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.id = SPORING_SCRIPT_ID;
    script.defer = true;
    script.src = hentSporingsSkriptUrl(hostname);
    script.setAttribute('data-website-id', hentNettstedId(hostname));
    script.setAttribute('data-tag', 'tiltak-refusjon');
    script.setAttribute('data-before-send', 'beforeSendAnalytics');
    script.setAttribute('data-exclude-search', 'true');

    return script;
}
