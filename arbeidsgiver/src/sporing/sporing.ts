import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';

export const SPORING_ORIGIN = 'tiltak-refusjon';
export const SPORING_SCRIPT_ID = 'innblikk-sporing-script';
export const SPORING_SCRIPT_SRC_DEV = 'https://cdn.nav.no/team-researchops/sporing/sporing-dev.js';
export const SPORING_SCRIPT_SRC_PROD = 'https://cdn.nav.no/team-researchops/sporing/sporing.js';
export const SPORING_WEBSITE_ID_DEV = 'a901f04e-0b4c-438e-9d98-89021358556a';
export const SPORING_WEBSITE_ID_PROD = '8d405f94-9968-4897-b1d8-5c159cc2fabd';

export type PageType = 'forside' | 'oversikt' | 'refusjon' | 'kvittering' | 'ikke-funnet';

type AnalyticsPayload = Record<string, unknown> & {
    url?: string;
    referrer?: string;
    origin?: string;
    pageType?: string;
};

type BeforeSendHandler = (type: string, payload: AnalyticsPayload) => AnalyticsPayload | false;

export function getSporingScriptSrc(hostname: string): string {
    return isDevelopmentHostname(hostname) ? SPORING_SCRIPT_SRC_DEV : SPORING_SCRIPT_SRC_PROD;
}

export function getWebsiteId(hostname: string): string {
    return isDevelopmentHostname(hostname) ? SPORING_WEBSITE_ID_DEV : SPORING_WEBSITE_ID_PROD;
}

export function getPageType(pathname: string): PageType {
    if (pathname === '/' || pathname === '') {
        return 'forside';
    }

    if (pathname === '/refusjon') {
        return 'oversikt';
    }

    if (/^\/refusjon\/[^/]+\/kvittering\/?$/.test(pathname)) {
        return 'kvittering';
    }

    if (/^\/refusjon\/[^/]+\/?.*$/.test(pathname)) {
        return 'refusjon';
    }

    return 'ikke-funnet';
}

export function createBeforeSendHandler(): BeforeSendHandler {
    return (_type, payload) => {
        return {
            ...payload,
            url: redactTrackingValue(payload.url),
            referrer: redactTrackingValue(payload.referrer),
            origin: SPORING_ORIGIN,
            pageType: getPageType(window.location.pathname),
        };
    };
}

export function updateConsentDisabledFlag(analyticsConsent: boolean) {
    if (analyticsConsent) {
        localStorage.removeItem('sporing.disabled');
        return;
    }

    localStorage.setItem('sporing.disabled', '1');
}

export function getAnalyticsConsent(): boolean {
    return getCurrentConsent().consent.analytics;
}

export function redactTrackingValue(value?: string): string | undefined {
    if (!value) {
        return value;
    }

    let redacted = value;

    try {
        const url = new URL(value);
        url.search = '';
        url.hash = '';
        redacted = url.toString();
    } catch {
        redacted = value;
    }

    return redacted.replace(/\b\d{11}\b/g, '***********').replace(/\b[A-Za-z]\d{6}\b/g, '*******');
}

function isDevelopmentHostname(hostname: string): boolean {
    return (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.includes('.dev.nav.no') ||
        hostname.includes('.intern.dev.nav.no')
    );
}

if (typeof window !== 'undefined') {
    window.beforeSendAnalytics = createBeforeSendHandler();
}
