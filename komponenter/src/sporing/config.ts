export const SPORING_ORIGIN = 'tiltak-refusjon';
export const SPORING_SCRIPT_ID = 'innblikk-sporing-script';
export const SPORING_SCRIPT_SRC_DEV = 'https://cdn.nav.no/team-researchops/sporing/sporing-dev.js';
export const SPORING_SCRIPT_SRC_PROD = 'https://cdn.nav.no/team-researchops/sporing/sporing.js';
export const SPORING_WEBSITE_ID_DEV = 'a901f04e-0b4c-438e-9d98-89021358556a';
export const SPORING_WEBSITE_ID_PROD = '8d405f94-9968-4897-b1d8-5c159cc2fabd';

export function hentSporingsSkriptUrl(hostname: string): string {
    return erUtviklingsmiljo(hostname) ? SPORING_SCRIPT_SRC_DEV : SPORING_SCRIPT_SRC_PROD;
}

export function hentNettstedId(hostname: string): string {
    return erUtviklingsmiljo(hostname) ? SPORING_WEBSITE_ID_DEV : SPORING_WEBSITE_ID_PROD;
}

function erUtviklingsmiljo(hostname: string): boolean {
    return (
        hostname === 'localhost' ||
        hostname === '127.0.0.1' ||
        hostname.includes('.dev.nav.no') ||
        hostname.includes('.intern.dev.nav.no')
    );
}
