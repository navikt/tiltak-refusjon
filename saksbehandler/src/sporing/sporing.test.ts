import { beforeEach, describe, expect, it } from 'vitest';
import { preInnsending } from '~/sporing/preInnsending';
import {
    hentNettstedId,
    hentSporingsSkriptUrl,
    SPORING_ORIGIN,
    SPORING_SCRIPT_SRC_DEV,
    SPORING_SCRIPT_SRC_PROD,
    SPORING_WEBSITE_ID_DEV,
    SPORING_WEBSITE_ID_PROD,
} from '~/sporing/config';
import { sladdFnrOgNavIdent } from '~/sporing/sladding';
import { hentSidetype } from './sporing';

describe('sporing', () => {
    beforeEach(() => {
        window.history.pushState({}, '', '/');
        localStorage.clear();
    });

    it('mapper hostnames til riktige sporingsressurser', () => {
        expect(hentSporingsSkriptUrl('localhost')).toBe(SPORING_SCRIPT_SRC_DEV);
        expect(hentSporingsSkriptUrl('tiltak-refusjon.dev.nav.no')).toBe(SPORING_SCRIPT_SRC_DEV);
        expect(hentSporingsSkriptUrl('tiltak-refusjon.nav.no')).toBe(SPORING_SCRIPT_SRC_PROD);

        expect(hentNettstedId('localhost')).toBe(SPORING_WEBSITE_ID_DEV);
        expect(hentNettstedId('tiltak-refusjon.dev.nav.no')).toBe(SPORING_WEBSITE_ID_DEV);
        expect(hentNettstedId('tiltak-refusjon.nav.no')).toBe(SPORING_WEBSITE_ID_PROD);
    });

    it('mapper stier til sidetyper', () => {
        expect(hentSidetype('/')).toBe('oversikt');
        expect(hentSidetype('/refusjon/123')).toBe('refusjon');
        expect(hentSidetype('/korreksjon/123')).toBe('refusjon');
        expect(hentSidetype('/refusjon/123/kvittering')).toBe('kvittering');
        expect(hentSidetype('/ukjent')).toBe('ukjent-side');
    });

    it('sladder url og referrer-verdier', () => {
        expect(sladdFnrOgNavIdent('https://nav.no/refusjon/123?fnr=12345678901&navident=A123456')).toBe(
            'https://nav.no/refusjon/123'
        );
        expect(sladdFnrOgNavIdent('A123456')).toBe('*******');
    });

    it('legger til origin og sidetype i beforeSend', () => {
        window.history.pushState({}, '', '/refusjon/123/kvittering');

        const beforeSend = preInnsending(hentSidetype);
        const result = beforeSend('besøk', {
            url: 'https://nav.no/refusjon/123?foo=bar',
            referrer: 'https://nav.no/min-side?navident=A123456',
        });

        expect(result).toMatchObject({
            origin: SPORING_ORIGIN,
            pageType: 'kvittering',
            url: 'https://nav.no/refusjon/123',
            referrer: 'https://nav.no/min-side',
        });
    });
});
