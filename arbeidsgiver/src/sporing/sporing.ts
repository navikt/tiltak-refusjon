import { getCurrentConsent } from '@navikt/nav-dekoratoren-moduler';

type PageType = 'forside' | 'oversikt' | 'refusjon' | 'korreksjon' | 'kvittering' | 'ukjent-side';

export function hentSidetype(pathname: string): PageType {
    const normalisertStinavn = normaliserStinavn(pathname);

    if (normalisertStinavn === '/' || normalisertStinavn === '') {
        return 'forside';
    }

    if (normalisertStinavn === '/refusjon') {
        return 'oversikt';
    }

    if (pathname.includes('kvittering')) {
        return 'kvittering';
    }

    if (pathname.includes('refusjon')) {
        return 'refusjon';
    }

    if (pathname.includes('korreksjon')) {
        return 'korreksjon';
    }

    return 'ukjent-side';
}

export function hentGjeldendeSamtykke() {
    return getCurrentConsent();
}

function normaliserStinavn(sti: string): string {
    if (sti.length <= 1) {
        return sti;
    }

    return sti.replace(/\/+$/, '');
}
