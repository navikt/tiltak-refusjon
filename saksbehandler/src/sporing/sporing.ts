type PageType = 'oversikt' | 'refusjon' | 'korreksjon' | 'kvittering' | 'ukjent-side';

export function hentSidetype(pathname: string): PageType {
    if (pathname === '/' || pathname === '') {
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
