import { cleanup, render, waitFor } from '@testing-library/react';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

let analyticsConsent = false;

vi.mock('@navikt/nav-dekoratoren-moduler', () => ({
    awaitDecoratorData: vi.fn().mockResolvedValue(undefined),
    getCurrentConsent: vi.fn(() => ({
        consent: {
            analytics: analyticsConsent,
            surveys: false,
        },
    })),
}));

import InnblikkSporing from './InnblikkSporing';
import { SPORING_SCRIPT_ID } from './sporing';

describe('InnblikkSporing', () => {
    beforeEach(() => {
        analyticsConsent = false;
        localStorage.clear();
        window.history.pushState({}, '', '/refusjon');
    });

    afterEach(() => {
        cleanup();
        document.getElementById(SPORING_SCRIPT_ID)?.remove();
        delete window.beforeSendAnalytics;
    });

    it('does not load tracking before consent', async () => {
        render(<InnblikkSporing />);

        await waitFor(() => {
            expect(localStorage.getItem('sporing.disabled')).toBe('1');
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeNull();
        });
    });

    it('loads tracking after consent and updates the disable flag', async () => {
        render(<InnblikkSporing />);

        analyticsConsent = true;
        window.dispatchEvent(new Event('consentAllWebStorage'));

        await waitFor(() => {
            expect(localStorage.getItem('sporing.disabled')).toBeNull();
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeInstanceOf(HTMLScriptElement);
        });

        const script = document.getElementById(SPORING_SCRIPT_ID) as HTMLScriptElement;
        expect(script.getAttribute('data-website-id')).toBe('a901f04e-0b4c-438e-9d98-89021358556a');
        expect(script.getAttribute('data-tag')).toBe('tiltak-refusjon');
        expect(script.getAttribute('data-before-send')).toBe('beforeSendAnalytics');
        expect(script.getAttribute('data-exclude-search')).toBe('true');
        expect(script.src).toContain('sporing-dev.js');
    });

    it('removes tracking and disables it when consent is revoked', async () => {
        analyticsConsent = true;
        render(<InnblikkSporing />);

        await waitFor(() => {
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeInstanceOf(HTMLScriptElement);
        });

        analyticsConsent = false;
        window.dispatchEvent(new Event('refuseOptionalWebStorage'));

        await waitFor(() => {
            expect(localStorage.getItem('sporing.disabled')).toBe('1');
            expect(document.getElementById(SPORING_SCRIPT_ID)).toBeNull();
        });
    });
});
