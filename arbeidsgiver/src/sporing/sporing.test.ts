import { beforeEach, describe, expect, it } from 'vitest';

import {
    SPORING_ORIGIN,
    SPORING_SCRIPT_SRC_DEV,
    SPORING_SCRIPT_SRC_PROD,
    SPORING_WEBSITE_ID_DEV,
    SPORING_WEBSITE_ID_PROD,
    createBeforeSendHandler,
    getPageType,
    getSporingScriptSrc,
    getWebsiteId,
    redactTrackingValue,
} from './sporing';

describe('sporing', () => {
    beforeEach(() => {
        window.history.pushState({}, '', '/');
    });

    it('maps hostnames to correct tracking assets', () => {
        expect(getSporingScriptSrc('localhost')).toBe(SPORING_SCRIPT_SRC_DEV);
        expect(getSporingScriptSrc('tiltak-refusjon.dev.nav.no')).toBe(SPORING_SCRIPT_SRC_DEV);
        expect(getSporingScriptSrc('tiltak-refusjon.nav.no')).toBe(SPORING_SCRIPT_SRC_PROD);

        expect(getWebsiteId('localhost')).toBe(SPORING_WEBSITE_ID_DEV);
        expect(getWebsiteId('tiltak-refusjon.dev.nav.no')).toBe(SPORING_WEBSITE_ID_DEV);
        expect(getWebsiteId('tiltak-refusjon.nav.no')).toBe(SPORING_WEBSITE_ID_PROD);
    });

    it('maps paths to page types', () => {
        expect(getPageType('/')).toBe('forside');
        expect(getPageType('/refusjon')).toBe('oversikt');
        expect(getPageType('/refusjon/123')).toBe('refusjon');
        expect(getPageType('/refusjon/123/kvittering')).toBe('kvittering');
        expect(getPageType('/ukjent')).toBe('ikke-funnet');
    });

    it('redacts url and referrer values', () => {
        expect(redactTrackingValue('https://nav.no/refusjon/123?fnr=12345678901&navident=A123456')).toBe(
            'https://nav.no/refusjon/123'
        );
        expect(redactTrackingValue('A123456')).toBe('*******');
    });

    it('adds origin and page type in beforeSend', () => {
        window.history.pushState({}, '', '/refusjon/123/kvittering');

        const beforeSend = createBeforeSendHandler();
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
