type PageType = 'forside' | 'oversikt' | 'refusjon' | 'kvittering' | 'ukjent-side';

export function hentSidetype(pathname: string): PageType {
    if (pathname === '/' || pathname === '') {
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
