import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';

type PageType = 'forside' | 'oversikt' | 'refusjon' | 'kvittering' | 'ukjent-side';

export function hentSidetype(pathname: string): PageType {
    const normalizedPathname = normaliserStinavn(pathname);

    if (normalizedPathname === '/' || normalizedPathname === '') {
        return 'forside';
    }

    if (normalizedPathname === '/refusjon') {
        return 'oversikt';
    }

    if (pathname.includes('kvittering')) {
        return 'kvittering';
    }

    if (pathname.includes('refusjon') || pathname.includes('korreksjon')) {
        return 'refusjon';
    }

    return 'ukjent-side';
}

export function hentGjeldendeSamtykke() {
    return getCurrentConsent();
}

function normaliserStinavn(pathname: string): string {
    if (pathname.length <= 1) {
        return pathname;
    }

    return pathname.replace(/\/+$/, '');
}
